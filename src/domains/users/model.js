import bcrypt from 'bcryptjs';

import BaseModel from '../../model.js';

const BCRYPT_SALT_LENGTH = 12;

class User extends BaseModel {

    static get tableName() {
      return 'users';
    }

    static get idColumn() {
      return 'id';
    }

    id
    cpf
    name
    email
    password
    created_at
    updated_at
    deleted_at

    $beforeInsert(queryContext) {
      super.$beforeInsert(queryContext);
      this.password = bcrypt.hashSync(this.password, BCRYPT_SALT_LENGTH);
    }

    $beforeUpdate(queryContext) {
      super.$beforeInsert(queryContext);
      if(this.password) {
        this.password = bcrypt.hashSync(this.password, BCRYPT_SALT_LENGTH)
      };
    }

    isPasswordCorrect(password) {
      try {
        return bcrypt.compareSync(password, this.password);
      } catch (err) {
        return false;
      }
    }   
}

export default User;