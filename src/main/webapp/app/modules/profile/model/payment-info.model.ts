import dayjs from 'dayjs/esm';
import { IProfile } from 'app/modules/profile/model/profile.model';
import { PAYMENTTYPE } from 'app/modules/profile/enumerations/paymenttype.model';

export interface IPaymentInfo {
  id?: number;
  paymentType?: PAYMENTTYPE;
  pNumber?: number;
  expiry?: dayjs.Dayjs | null;
  security?: number | null;
  profile?: IProfile | null;
}

export class PaymentInfo implements IPaymentInfo {
  constructor(
    public id?: number,
    public paymentType?: PAYMENTTYPE,
    public pNumber?: number,
    public expiry?: dayjs.Dayjs | null,
    public security?: number | null,
    public profile?: IProfile | null
  ) {}
}

export function getPaymentInfoIdentifier(paymentInfo: IPaymentInfo): number | undefined {
  return paymentInfo.id;
}
