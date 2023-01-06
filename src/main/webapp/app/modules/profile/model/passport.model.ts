import dayjs from 'dayjs/esm';
import { IProfile } from 'app/modules/profile/model/profile.model';
import { PASSPORTTYPE } from 'app/modules/profile/enumerations/passporttype.model';

export interface IPassport {
  id?: number;
  identity?: string;
  expiry?: dayjs.Dayjs;
  issuingCountry?: string;
  documentNumber?: string | null;
  passportType?: PASSPORTTYPE;
  profile?: IProfile | null;
}

export class Passport implements IPassport {
  constructor(
    public id?: number,
    public identity?: string,
    public expiry?: dayjs.Dayjs,
    public issuingCountry?: string,
    public documentNumber?: string | null,
    public passportType?: PASSPORTTYPE,
    public profile?: IProfile | null
  ) {}
}

export function getPassportIdentifier(passport: IPassport): number | undefined {
  return passport.id;
}
