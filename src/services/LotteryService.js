import UserRepository from '../repositories/UserRepository.js';
import LotteryRepository from '../repositories/LotteryRepository.js';
import { ErrorCore } from '../shared/core/ErrorCore.js';

// --- Helper para simular latencia (delay) ---
// Lo ponemos fuera de la clase ya que es una función pura de utilidad
const simulateDelay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};


class LotteryService {
    constructor() {
        this.lotteryRepository = new LotteryRepository();
        this.userRepository = new UserRepository();
    }

    /**
     * Ejecuta la lógica de la lotería con caos controlado (latencia y fallos).
     * @param {object} transaction - La transacción de la base de datos (si aplica).
     * @param {object} data - Datos de entrada, esperamos { userId: '...' }.
     */
    async run(transaction, data) {
        const user = await this.userRepository.findOne({ where: { email: data.email } });

        if (!user) throw new ErrorCore('not_found', {
            level: 'warn',
            message: 'not_found',
            own: data.email,
            service: 'LotteryService',
            endpoint: '/lottery'
        });


        const delayTime = Math.floor(Math.random() * 2300) + 200;
        await simulateDelay(delayTime);

        if (Math.random() < 0.25) throw new ErrorCore('server', {
            level: 'error',
            message: 'server',
            own: data.email,
            service: 'LotteryService',
            endpoint: '/lottery',
        });

        const resultado = await this.lotteryRepository.create({
            payload: {
                user_id: user.id,
                points: 1
            }
        }, transaction);

        return resultado;
    }
}

export default LotteryService;