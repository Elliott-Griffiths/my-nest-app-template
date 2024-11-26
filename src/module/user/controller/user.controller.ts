import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../service/user.service';
import { plainToClass } from 'class-transformer';

import * as RequestDto from '../dto/request';
import * as ResponseDto from '../dto/response';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: ResponseDto.CreateUserDto,
  })
  async create(
    @Body() createUserDto: RequestDto.CreateUserDto,
  ): Promise<ResponseDto.CreateUserDto> {
    const user = await this.usersService.create(createUserDto);
    return plainToClass(ResponseDto.CreateUserDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: ResponseDto.GetUsersDto,
  })
  async findAll(
    @Query() query: RequestDto.GetUsersDto,
  ): Promise<ResponseDto.GetUsersDto> {
    const response = await this.usersService.findAll(query);

    return {
      data: response.data.map((user) =>
        plainToClass(ResponseDto.GetUserDto, user),
      ),
      currentPage: response.currentPage,
      itemsPerPage: response.itemsPerPage,
      totalItems: response.totalItems,
      totalPages: response.totalPages,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    type: ResponseDto.GetUserDto,
  })
  async findOne(
    @Param() params: RequestDto.GetUserDto,
  ): Promise<ResponseDto.GetUserDto> {
    const user = await this.usersService.findOne(params.id);
    return plainToClass(ResponseDto.GetUserDto, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    type: ResponseDto.UpdateUserDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: RequestDto.UpdateUserDto,
  ): Promise<ResponseDto.UpdateUserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return plainToClass(ResponseDto.UpdateUserDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    type: ResponseDto.DeleteUserDto,
    description: 'User deleted successfully',
  })
  async remove(
    @Param('id') id: string,
    @Body() deleteUserDto: RequestDto.DeleteUserDto,
  ): Promise<ResponseDto.DeleteUserDto> {
    await this.usersService.delete(id, deleteUserDto);

    return {
      success: true,
      message: 'User deleted successfully',
      deletedId: id,
      deletedAt: new Date(),
      reason: deleteUserDto.reason,
    };
  }
}
