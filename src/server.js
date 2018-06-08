import { } from 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import v1Route from './routes/v1';

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
app.all('/', (req, res) => {
  res.redirect('/api/v1');
});
app.use('/api/v1', v1Route);


/* eslint-disable no-console */
export const server = app.listen(PORT, () => {
  if (app.get('env') === 'development') console.log(`The server is live on port ${PORT}`);
});

export default app;
