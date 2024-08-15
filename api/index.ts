import express from 'express';
import fileDb from './fileDb';
import guestsRouter from './routers/guests';
import cors, {CorsOptions} from 'cors';

const app = express();
const port = 8001;

const whitelist = ['http://localhost:8001', 'http://localhost:5174'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/guests', guestsRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

run().catch(console.error);