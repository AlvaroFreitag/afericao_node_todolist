import Category from "./model.js";
import { validateSchema } from "../../helpers/joi.js";
import validators from "../categories/validators.js";

import orderByConstructor from "../../helpers/orders.js";
import filterByConstructor from "../../helpers/filters.js"

import badRequestError from "../../errors/badRequestError.js";
import categoriesErrors from "./errors.js";
import unauthorizedError from "../../errors/unauthorizedError.js";
import notFoundError from "../../errors/notFoundError.js";

// Cria uma categoria
async function create(request, response, next) {
    try {
        const { body } = request;

        const { values, errors } = validateSchema(validators.createSchema, body);
        if (errors) {
            return badRequestError(response, errors)
        };

        const category = await Category.query()
            .insertAndFetch({
                user_id: request.user.id,
                ...values,
            });

        response.status(201)
            .json(category);
    } catch (error) {
        next(error);
    }
};

// Atualiza uma categoria
async function update(request, response, next) {
    try {
        const { params, body } = request;
        const { categoryId } = params;

        const { values, errors } = validateSchema(validators.updateSchema, body);
        if (errors) {
            return badRequestError(response, errors)
        };

        const searchCategory = await Category.query()
            .findById(categoryId)
            .whereNull('deleted_at');

        if (!searchCategory) {
            return notFoundError(response, categoriesErrors.category_not_found);
        }

        const updateCategory = await searchCategory.$query()
            .update(values);

        response.json(searchCategory);
    } catch (error) {
        next(error);
    }
};

// Lista uma categoria
async function get(request, response, next) {
    try {
        const { params } = request;
        const { categoryId } = params;

        const searchCategory = await Category.query()
            .findById(categoryId);

        if (!searchCategory) {
            return notFoundError(response, categoriesErrors.category_not_found);
        }

        response.json(searchCategory);
    } catch (error) {
        next(error);
    }
};

// Lista as categorias, ordena, filtra, e coloca a paginação
async function find(request, response, next) {
    try {
        const { query } = request;
        const { limit, page, orderBy, filterBy } = query;

        const categoryQueryBuilder = Category.query();

        const offset = limit * (page - 1);

        const countQuery = categoryQueryBuilder
            .resultSize();
        const categories = categoryQueryBuilder
            .limit(limit)
            .offset(offset);

        if (orderBy) {
            const orders = orderByConstructor(orderBy, new Category);
            orders
                ? categoryQueryBuilder.orderBy(...orders)
                : null
        }

        if (filterBy) {
            const filters = filterByConstructor(filterBy);
            filters
                ? categoryQueryBuilder[filters.method](...filters.filterValues)
                : null
        }

        const [total, result] = await Promise.all([countQuery, categories]);

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

// Exclui uma categoria
async function remove(request, response, next) {
    try {
        const { params } = request;
        const { categoryId } = params;

        const searchCategory = await Category.query()
            .findById(categoryId)

        if (!searchCategory) {
            return unauthorizedError(response, categoriesErrors.user_not_found);
        }

        await searchCategory.$query()
            .update({
                deleted_at: new Date()
            });

        response.status(searchCategory);
    } catch (error) {
        next(error);
    }
};

export default {
    create,
    update,
    get,
    find,
    remove,
};