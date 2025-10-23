class HealthService {
    /**
     * API health status
     */
    async apiStatus() {
        return {
            message: 'API Run 2525',
            mode: process.env.ENVIRONMENT
        }
    }
}

export default HealthService;