import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD?.toString(), // Convert to string explicitly
  database: process.env.POSTGRES_DB,
  entities: [User],
  synchronize: true,
  logging: true,
  ssl: false,
  autoLoadEntities: true,
};

// Add this for debugging
console.log('Database Config:', {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
});
