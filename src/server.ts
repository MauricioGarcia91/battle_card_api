import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import { router as CardRouter } from './cards/adapters/routes';
import { router as CardTypeRouter } from './card-types/adapters/routes';
import swaggerDoc from '../swagger.json';

const app = express();
const PORT = process.env.API_LOCAL_PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/cards', CardRouter);
app.use('/types', CardTypeRouter);

app.use('/docs', serve, setup(swaggerDoc));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(
    '[ERROR]',
    err instanceof Error
      ? err.stack
      : JSON.stringify(err.message) || JSON.stringify(err)
  );
  res.status(500).json({ error: 'Something wrong happened' });
});

export async function initializeServer() {
  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      resolve(server);
    });

    server.on('error', (err: any) => {
      console.error(
        `[ERROR] [initializeServer] ${err instanceof Error ? err.message : err}`
      );
      reject('Server not initialize');
    });
  });
}
