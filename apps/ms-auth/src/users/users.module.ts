import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
