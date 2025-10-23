class HealthService {
    /**
     * API health status
     */
    async apiStatus() {
        return {
            message: 'API Run',
            mode: process.env.ENVIRONMENT
        }
    }
}

export default HealthService;