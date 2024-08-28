import User from "./model.js";
import { validateSchema } from "../../helpers/joi.js";
import validators from "./validators.js";

import badRequestError from "../../errors/badRequestError.js";
import { duplicateEntryForKey } from "../../helpers/database.js";
import usersErrors from "./erros.js"
import notFoundError from "../../errors/notFoundError.js";
import unauthorizedError from "../../errors/unauthorizedError.js";

import orderByConstructor from "../../helpers/orders.js";
import filterByConstructor from "../../helpers/filters.js";
import { createPayload, createToken } from "../../helpers/auth.js";

// Faz o mapeamento dos erros de constraint para retorno esperado de acordo com situação.
function catchDatabaseError(error) {
    if (duplicateEntryForKey(error, 'users.users_cpf_unique')) {
        return error = {
            database_error: true,
            error_message: usersErrors.cpf_unique
        }
    }
    if (duplicateEntryForKey(error, 'users.users_email_unique')) {
        return error = {
            database_error: true,
            error_message: usersErrors.email_unique
        }
    }

    return error;
}

// Login do usuário com token
export async function login(request, response, next) {
    try {
        const { body } = request;
        const userSelected = await User.query()
            .findOne({
                email: body.email,
            });

        if (!userSelected?.isPasswordCorrect(body.password)) {
            return unauthorizedError(response, usersErrors.user_unauthorized);
        }

        const payload = createPayload(userSelected);
        const token = createToken(payload);
        response.status(200)
            .json({
                user: payload,
                token: token,
            });
    } catch (error) {
        next(error);
    }
}

// Atualiza o token de autenticação
async function refreshToken(request, response, next) {
    try {
        const { body } = request;

        const payload = createPayload(body);
        const newToken = createToken(payload);
        
        response.status(200)
            .json({
                token: newToken,
                user: payload,
            });
    } catch (error) {
        next(error);
}
};

// Cria um usuário
export async function create(request, response, next) {
    try {
        const { body } = request;

        const { values, errors } = validateSchema(validators.createSchema, body);
        if (errors) return badRequestError(response, errors);

        const user = await User.query()
            .insertAndFetch(values);

        response.json(user);
    } catch (error) {
        if (error.constraint) error = catchDatabaseError(error);
        next(error);
    }
};

// Atualiza um usuário
async function update(request, response, next) {
    try {
        const { params, body } = request;
        const { userId } = params;

        const { values, errors } = validateSchema(validators.updateSchema, body);

        if (errors) {
            return badRequestError(response, errors)
        };

        const buscarUsuario = await User.query()
            .findById(userId);

        if (!buscarUsuario) {
            return notFoundError(response, usersErrors.user_not_found);
        }

        const userUpdate = await buscarUsuario.$query()
            .updateAndFetch(values);

        response.json(userUpdate);
    } catch (error) {
        if (error.constraint) error = catchDatabaseError(error);
        next(error);
    }
};

// Lista um usuário
async function get(request, response, next) {
    try {
        const { params } = request;
        const { userId } = params;

        const buscarUsuario = await User.query()
            .findById(userId);


        if (!buscarUsuario) {
            return notFoundError(response, usersErrors.user_not_found);
        }

        response.json(buscarUsuario);
    } catch (error) {
        if (error.constraint) error = catchDatabaseError(error);
        next(error);
    }
};

// Lista os usuários
async function find(request, response, next) {
    try {
        const { query } = request;
        const { limit, page, orderBy, filterBy } = query;

        const userQueryBuilder = User.query();

        const offset = limit * (page - 1);

        const countQuery = userQueryBuilder
            .resultSize();
        const users = userQueryBuilder
            .limit(limit)
            .offset(offset);

        if (orderBy) {
            const orders = orderByConstructor(orderBy, new User);
            orders
                ? userQueryBuilder.orderBy(...orders)
                : null
        }

        if (filterBy) {
            const filters = filterByConstructor(filterBy);
            filters
                ? userQueryBuilder[filters.method](...filters.filterValues)
                : null
        }

        const [total, result] = await Promise.all([countQuery, users]);

        response.json({
            metadata: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
                length: result.length,
            },
            result,
        });
    } catch (error) {
        next(error);
    }
};

// Deteltar um usuário
async function remove(request, response, next) {
    try {
        const { params } = request;
        const { userId } = params;

        const buscarUsuario = await User.query()
            .findById(userId)

        if (!buscarUsuario) {
            return notFoundError(response, usersErrors.user_not_found);
        }

        await buscarUsuario.$query()
            .delete();

        response.status(204)
            .json(buscarUsuario);
    } catch (error) {
        next(error);
    }
};

export default {
    refreshToken,
    find,
    update,
    get,
    remove,
};