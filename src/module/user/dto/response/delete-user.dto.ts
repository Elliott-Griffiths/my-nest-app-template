import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({
    example: true,
    description: 'Whether the deletion was successful',
  })
  success: boolean;

  @ApiProperty({
    example: 'User deleted successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the deleted user',
  })
  deletedId: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'When the deletion occurred',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'Account deactivated by user request',
    description: 'Reason for deletion',
    required: false,
  })
  reason?: string;
}
