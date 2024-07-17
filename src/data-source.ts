import { DataSource } from 'typeorm';
import { Card } from './cards/domain/entity';
import { CardType } from './card-types/domain/entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_LOCAL_HOST,
  port: Number(process.env.DATABASE_LOCAL_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [Card, CardType]
});

export async function initializeDataSource() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized');
  } catch (err) {
    console.error(
      `[ERROR] [initializeDataSource] ${
        err instanceof Error ? err.message : err
      }`
    );

    throw Error('Data source not initialize');
  }
}
