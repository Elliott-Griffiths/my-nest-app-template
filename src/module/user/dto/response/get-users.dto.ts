import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from './get-user.dto';

export class GetUsersDto {
  @ApiProperty({ type: [GetUserDto] })
  data: GetUserDto[];

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  itemsPerPage: number;

  @ApiProperty({ example: 100 })
  totalItems: number;

  @ApiProperty({ example: 10 })
  totalPages: number;

  constructor(partial: Partial<GetUsersDto>) {
    Object.assign(this, partial);
  }
}
