import dayjs from 'dayjs/esm';
import { IApplicationInstance } from 'app/modules/application/model/application-instance.model';
import { CorrespondenceStatusEnum } from 'app/modules/application/enumerations/correspondence-status-enum.model';
import { CorrespondenceTypeEnum } from 'app/modules/application/enumerations/correspondence-type-enum.model';

export interface ICorrespondence {
  id?: number;
  status?: CorrespondenceStatusEnum;
  type?: CorrespondenceTypeEnum;
  statusDescription?: string | null;
  sentDate?: dayjs.Dayjs;
  documentNumber?: number | null;
  templateId?: number;
  metaDataId?: number;
  documentContentType?: string;
  document?: string;
  application?: IApplicationInstance | null;
}

export class Correspondence implements ICorrespondence {
  constructor(
    public id?: number,
    public status?: CorrespondenceStatusEnum,
    public type?: CorrespondenceTypeEnum,
    public statusDescription?: string | null,
    public sentDate?: dayjs.Dayjs,
    public documentNumber?: number | null,
    public templateId?: number,
    public metaDataId?: number,
    public documentContentType?: string,
    public document?: string,
    public application?: IApplicationInstance | null
  ) {}
}

export function getCorrespondenceIdentifier(correspondence: ICorrespondence): number | undefined {
  return correspondence.id;
}
