import { Router } from 'express';
import { setupMetrics } from '../shared/logs/PrometheusClient.js';

export function MetricsRouter(main) {
    const router = Router();
    const registry = setupMetrics();

    // Endpoint principal de métricas
    router.get('/', async (req, res) => {
        try {
            res.setHeader('Content-Type', registry.contentType);
            const metrics = await registry.metrics();
            res.end(metrics);
        } catch (error) {
            res.status(500).json({ error: 'Failed to collect metrics' });
        }
    });

    /*
    app.use((req, res, next) => {
    // Función para registrar la métrica cuando la respuesta finaliza
    res.on('finish', () => {
        // Usamos el contador importado
        httpRequestsCounter.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status_code: res.statusCode,
        });
    });
    next();
    });
    */

    main.use('/metrics', router);
}