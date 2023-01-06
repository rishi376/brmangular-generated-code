import dayjs from 'dayjs/esm';
import { IUser } from 'app/core/user-brm/user.model';
import { ProfileType } from 'app/modules/profile/enumerations/profile-type.model';
import { ProfileSource } from 'app/modules/profile/enumerations/profile-source.model';
import { ProfileStatus } from 'app/modules/profile/enumerations/profile-status.model';
import { ProfileVerificationStatus } from 'app/modules/profile/enumerations/profile-verification-status.model';
import { ICustomer } from './customer.model';
import { IPaymentInfo } from './payment-info.model';
import { IPassport } from './passport.model';
/* brm-needle-add-profile-bedirectional-imports - Brm needle to add bidirectional dependencies to Profile model */

export interface IProfile {
  id?: number;
  profileType?: ProfileType;
  profileSource?: ProfileSource;
  status?: ProfileStatus;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  verificationStatus?: ProfileVerificationStatus;
  user?: IUser | null;
  customer?: ICustomer | null;
  paymentInfo?: IPaymentInfo[] | null;
  passport?: IPassport | null;
  /* brm-needle-add-profile-bedirectional-Idependencies - Brm needle to add bidirectional dependencies to Profile model */
}

export class Profile implements IProfile {
  constructor(
    public id?: number,
    public profileType?: ProfileType,
    public profileSource?: ProfileSource,
    public status?: ProfileStatus,
    public createdBy?: string | null,
    public createdDate?: dayjs.Dayjs | null,
    public verificationStatus?: ProfileVerificationStatus,
    public user?: IUser | null,
    customer?: ICustomer | null,
    paymentInfo?: IPaymentInfo[] | null,
    passport?: IPassport | null
    /* brm-needle-add-profile-bedirectional-dependencies - Brm needle to add bidirectional dependencies to Profile model */
  ) {}
}

export function getProfileIdentifier(profile: IProfile): number | undefined {
  return profile.id;
}
