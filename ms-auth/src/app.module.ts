import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from './users/users.module';
dotenv.config(); // Load .env variables

console.log(process.env.DATABASE_HOST || 'postgres');
console.log(process.env.DATABASE_PASSWORD);


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'postgres',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Do not use in production
      entities: [User],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
