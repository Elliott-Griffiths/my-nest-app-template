import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    example: 'Account deactivated by user request',
    description: 'Reason for deletion',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
