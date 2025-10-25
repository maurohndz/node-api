import UserRepository from '../repositories/UserRepository.js';
import { ErrorCore } from '../shared/core/ErrorCore.js';

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async create(transaction, data) {
        const exist = await this.repository.findOne({ where: { email: data.email } });

        if (exist) throw new ErrorCore('data_exist');

        const user = await this.repository.create({
            payload: {
                names: data.names,
                last_names: data.last_names,
                email: data.email
            }
        }, transaction);

        return user
    }
}

export default UserService;
