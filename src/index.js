import express from 'express';
import errorMiddleware from './middlewares/error.js';
import notFoundError from './errors/notFoundError.js';
import users from './domains/users/routes.js';
import { login } from './domains/users/controllers.js';
import { authenticateToken } from './middlewares/authorization.js';
import categories from './domains/categories/routes.js';
import { create } from '../src/domains/users/controllers.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.json({message: 'Hello World!'})
})

app.post('/create', create);
app.post('/login', login);
app.use(authenticateToken);
app.use('/users', users);
app.use('/categories', categories)

app.use((request, response) => notFoundError(response));
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});