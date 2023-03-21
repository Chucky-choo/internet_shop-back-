import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5000,
  username: 'postgres',
  password: 'dedafu47',
  database: 'Edelweiss',
});

export default AppDataSource;
