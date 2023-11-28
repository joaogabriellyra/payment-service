import 'reflect-metadata'
import { DataSource } from 'typeorm';
import 'dotenv/config'

export const MyPostgresDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  database: process.env.DB_DATABASE,
  url: process.env.DB_CONNECTION_STRING,
  entities: ['src/database/entity/*.ts', 'src/database/entity/*.js'],
  migrations: ['src/database/migrations/*.ts', 'src/database/migrations/*.js'],
  logging: false,
  synchronize: true
});