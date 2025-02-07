import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

interface UserPayload {
  username: string;
  password: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(payload: UserPayload): Promise<User | null> {
    const { username, password, email } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      email,
    });

    return this.userRepo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findUserByUsername(username: string) {
    if (!username) {
      return null;
    }

    return this.userRepo.findOne({ where: { username } });
  }
}
