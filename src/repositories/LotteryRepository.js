import { RepositoryCore } from '../shared/core/RepositoryCore.js';
import { models } from '../database/connection.js';

class LotteryRepository extends RepositoryCore {
    constructor() {
        super(models.lottery);
    }
}

export default LotteryRepository;
