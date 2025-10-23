import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { mountRouter } from './router/index.js';

// App express
const app = express();

// Security middleware
app.use(helmet());
app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
}));

// Config
app.use(cors());
app.set('env', process.env.ENVIRONMENT);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

// Mount router
mountRouter(app);

const server = http.createServer(app);

server.listen(Number(process.env.PORT), async () => {
    console.log(`API is running on port ${Number(process.env.PORT)} in ${app.get('env')} mode`);
});