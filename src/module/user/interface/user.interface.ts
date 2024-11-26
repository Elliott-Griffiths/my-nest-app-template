import { IBase } from '@common/interface/base.interface';

export interface IUser extends IBase {
  email: string;
  name: string;
}
