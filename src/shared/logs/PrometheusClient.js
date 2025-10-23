import client from 'prom-client';

// Registry centralizado
const register = new client.Registry();

// Métricas HTTP (ya las tienes)
export const httpRequestsCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests received',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
});

// NUEVAS MÉTRICAS PARA SALUD
export const healthChecksTotal = new client.Counter({
    name: 'health_checks_total',
    help: 'Total number of health checks performed',
    labelNames: ['status', 'service', 'environment'],
    registers: [register],
});

/*
export const healthCheckDuration = new client.Histogram({
  name: 'health_check_duration_seconds',
  help: 'Duration of health checks in seconds',
  labelNames: ['service'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0],
  registers: [register],
});

export const serviceAvailability = new client.Gauge({
  name: 'service_availability',
  help: 'Service availability status (1=up, 0=down)',
  labelNames: ['service', 'environment'],
  registers: [register],
});
 */

export function setupMetrics() {
    register.setDefaultLabels({
      app: process.env.APP_NAME
    });
    
    client.collectDefaultMetrics({ register });
    return register;
}