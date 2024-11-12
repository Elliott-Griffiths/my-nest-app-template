import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Import from entity, not interface

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // CREATE
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  // READ (all)
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // READ (one)
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // UPDATE
  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.findOne(id); // Check if user exists
    await this.usersRepository.update(id, userData);
    return await this.findOne(id);
  }

  // DELETE
  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
