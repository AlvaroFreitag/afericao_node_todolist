import BaseModel from '../../model.js'
import User from '../users/model.js';

class Category extends BaseModel {

    static get tableName() {
      return 'categories';
    }

    static get idColumn() {
        return 'id'
    }

    id
    user_id
    title
    created_at
    updated_at
    
    static relationMappings = {
        author: {
            relation: BaseModel.HasManyRelation,
            modelClass: User,
            join: {
                from: 'categories.user_id',
                to: 'users.id'
            }
        }
    };
}

export default Category;