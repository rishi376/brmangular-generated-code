import dayjs from 'dayjs/esm';
import { IApplicationInstance } from 'app/modules/application/model/application-instance.model';
import { DocumentStatusEnum } from 'app/modules/application/enumerations/document-status-enum.model';
import { DocumentTypeEnum } from 'app/modules/application/enumerations/document-type-enum.model';

export interface IDocument {
  id?: number;
  status?: DocumentStatusEnum;
  statusDescription?: string | null;
  sentDate?: dayjs.Dayjs;
  type?: DocumentTypeEnum;
  documentNumber?: string | null;
  application?: IApplicationInstance | null;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public status?: DocumentStatusEnum,
    public statusDescription?: string | null,
    public sentDate?: dayjs.Dayjs,
    public type?: DocumentTypeEnum,
    public documentNumber?: string | null,
    public application?: IApplicationInstance | null
  ) {}
}

export function getDocumentIdentifier(document: IDocument): number | undefined {
  return document.id;
}
