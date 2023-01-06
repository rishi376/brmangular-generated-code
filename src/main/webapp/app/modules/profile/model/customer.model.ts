import dayjs from 'dayjs/esm';
import { IProfile } from 'app/modules/profile/model/profile.model';
import { GENDER } from 'app/modules/profile/enumerations/gender.model';

export interface ICustomer {
  id?: number;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  dob?: dayjs.Dayjs;
  gender?: GENDER;
  profile?: IProfile | null;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public firstName?: string,
    public middleName?: string | null,
    public lastName?: string,
    public dob?: dayjs.Dayjs,
    public gender?: GENDER,
    public profile?: IProfile | null
  ) {}
}

export function getCustomerIdentifier(customer: ICustomer): number | undefined {
  return customer.id;
}
