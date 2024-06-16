import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Item } from './item/item.entity';
import { Category } from './category/category.entity';
import * as dotenv from 'dotenv';

dotenv.config();

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: getEnvVariable('DB_HOST'),
  port: 3306,
  username: getEnvVariable('DB_USERNAME'),
  password: getEnvVariable('DB_PASSWORD'),
  database: getEnvVariable('DB_NAME'),
  entities: [User, Item, Category],
  synchronize: true,
  autoLoadEntities: true,
};


