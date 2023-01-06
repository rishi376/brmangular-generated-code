import dayjs from 'dayjs/esm';
import { IApplication } from 'app/modules/application/model/application.model';
import { IProcessStatus } from 'app/modules/application/model/process-status.model';
import { ICorrespondence } from 'app/modules/application/model/correspondence.model';
import { IDocument } from 'app/modules/application/model/document.model';
import { IProfile } from 'app/modules/profile/model/profile.model';
import { ApplicationInstanceEnum } from 'app/modules/application/enumerations/application-instance-enum.model';
import { ApplicationReasonEnum } from 'app/modules/application/enumerations/application-reason-enum.model';

export interface IApplicationInstance {
  id?: number;
  appInstanceId?: string;
  status?: ApplicationInstanceEnum;
  initiatedBy?: string;
  submittedBy?: string | null;
  reason?: ApplicationReasonEnum;
  createdOn?: dayjs.Dayjs;
  submittedOn?: dayjs.Dayjs | null;
  currentNavigationState?: string;
  application?: IApplication | null;
  processStatusses?: IProcessStatus[] | null;
  correspondences?: ICorrespondence[] | null;
  documents?: IDocument[] | null;
  profile?: IProfile | null;
}

export class ApplicationInstance implements IApplicationInstance {
  constructor(
    public id?: number,
    public appInstanceId?: string,
    public status?: ApplicationInstanceEnum,
    public initiatedBy?: string,
    public submittedBy?: string | null,
    public reason?: ApplicationReasonEnum,
    public createdOn?: dayjs.Dayjs,
    public submittedOn?: dayjs.Dayjs | null,
    public currentNavigationState?: string,
    public application?: IApplication | null,
    public processStatusses?: IProcessStatus[] | null,
    public correspondences?: ICorrespondence[] | null,
    public documents?: IDocument[] | null,
    public profile?: IProfile | null
  ) {}
}

export function getApplicationInstanceIdentifier(applicationInstance: IApplicationInstance): number | undefined {
  return applicationInstance.id;
}
