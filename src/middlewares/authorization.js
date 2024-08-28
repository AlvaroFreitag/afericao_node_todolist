import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import _ from "lodash";

import forbiddenError from '../errors/forbiddenError.js';
import usersErrors from '../domains/users/erros.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '..', '.env'),
  });

const {
    JWT_SECRET,
    TOKEN_EXPIRES,
} = process.env;

export function authenticateToken(request, response, next) {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return forbiddenError(response, usersErrors.token_not_found);
        }

        jwt.verify(token, JWT_SECRET, (error, user) => {
            if (error) {
                return forbiddenError(response, usersErrors.token_not_found);
            }

            request.user = user; // Adiciona o usuário decodificado ao objeto de request
            next(); // Passa para a próxima função de middleware
        });
    } catch (error) {
        next(error);
    }
};

