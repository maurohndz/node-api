import { RepositoryCore } from '../shared/core/RepositoryCore.js';
import { models } from '../database/connection.js';

class UserRepository extends RepositoryCore {
    constructor() {
        super(models.user);
    }
}

export default UserRepository;
