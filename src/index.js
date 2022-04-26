import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/index.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3333;

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.use(cors());
app.use('/api', router);

app.get('/', (request, response) => {
  response.json({ users: [{ name: 'Pedro', city: 'Formiga' }] });
});

app.listen(PORT, () => {
  console.log(`server running PORT: ${PORT}`);
});
