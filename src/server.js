import { } from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import v1Route from './routes/v1';
import swaggerDoc from './swagger.json';

const app = express();
const { PORT = 3000 } = process.env;

// Middlewares
app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes handler
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', v1Route);
app.all('/', (req, res) => {
  res.sendFile('index.html');
});

/* eslint-disable no-console */
export const server = app.listen(PORT, () => {
  if (app.get('env') === 'development') console.log(`The server is live on port ${PORT}`);
});

export default app;
