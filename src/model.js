import createKnex from 'knex';
import { Model } from 'objection';

import knexConfig from '../database/knexfile.js';

const knex = createKnex(knexConfig);

Model.knex(knex);

class BaseModel extends Model {

    static get idColumn() {
        return 'id';
    }

}

export default BaseModel;