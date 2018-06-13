import express from 'express';
import path from 'path';

const app = express();
const { PORT = 5000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
// Routes handler
app.get('/', (request, response) => {
  response.sendFile('index.html');
});


/* eslint-disable no-console */
export const server = app.listen(PORT, () => {
  if (app.get('env') === 'development') console.log(`The server is live on port ${PORT}`);
});

export default app;
