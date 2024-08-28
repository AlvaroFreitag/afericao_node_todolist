import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import _ from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '..', '.env'),
  });

const {
    JWT_SECRET,
    TOKEN_EXPIRES,
} = process.env;

export function createPayload(user) {
    return _.pick(user, ['id', 'cpf', 'name', 'email']);
};

export function createToken(payload) {
    return jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES },
    );
};


