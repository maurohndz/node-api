import UserRepository from '../repositories/UserRepository.js';
import { ErrorCore } from '../shared/core/ErrorCore.js';

const simulateDelay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async create(transaction, data) {
        const delayTime = Math.floor(Math.random() * 2300) + 400;
        await simulateDelay(delayTime);

        const exist = await this.repository.findOne({ where: { email: data.email } });

        if (exist) throw new ErrorCore('data_exist', {
            level: 'warn',
            own: data.email,
            service: 'UserService',
            endpoint: '/user'
        });

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
