import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@common/base/base.entity';
import { IUser } from '../interface/user.interface';

@Entity('users')
export class User extends BaseEntity implements IUser {
  @Column()
  email: string;

  @Column()
  name: string;
}
