import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as RequestDto from '../dto/request';
import * as ResponseDto from '../dto/response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // CREATE
  async create(
    createUserDto: RequestDto.CreateUserDto,
  ): Promise<ResponseDto.CreateUserDto> {
    const newUser = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(newUser);
    return this.toCreateUserResponse(savedUser);
  }

  // READ (all)
  async findAll(
    query: RequestDto.GetUsersDto,
  ): Promise<ResponseDto.GetUsersDto> {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: ((query.page || 1) - 1) * (query.limit || 10),
      take: query.limit || 10,
    });

    return {
      data: users.map((user) => this.toGetUserResponse(user)),
      currentPage: query.page || 1,
      itemsPerPage: query.limit || 10,
      totalItems: total,
      totalPages: Math.ceil(total / (query.limit || 10)),
    };
  }

  // READ (one)
  async findOne(id: string): Promise<ResponseDto.GetUserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.toGetUserResponse(user);
  }

  // UPDATE
  async update(
    id: string,
    updateUserDto: RequestDto.UpdateUserDto,
  ): Promise<ResponseDto.UpdateUserDto> {
    await this.findOne(id); // Check if user exists
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    return this.toUpdateUserResponse(updatedUser);
  }

  // DELETE
  async delete(
    id: string,
    deleteUserDto: RequestDto.DeleteUserDto,
  ): Promise<void> {
    if (deleteUserDto?.reason) {
      await this.findOne(id);
      await this.usersRepository.softDelete(id);
    } else {
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    }
  }

  // Private helper methods for transforming entities to DTOs
  private toCreateUserResponse(user: User): ResponseDto.CreateUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  private toGetUserResponse(user: User): ResponseDto.GetUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private toUpdateUserResponse(user: User): ResponseDto.UpdateUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
    };
  }
}
