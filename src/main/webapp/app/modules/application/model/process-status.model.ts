import dayjs from 'dayjs/esm';
import { IApplicationInstance } from 'app/modules/application/model/application-instance.model';
import { ProcessStatusEnum } from 'app/modules/application/enumerations/process-status-enum.model';

export interface IProcessStatus {
  id?: number;
  status?: ProcessStatusEnum;
  statusDescription?: string | null;
  finalState?: boolean;
  userActionRequired?: boolean;
  decisionMadeOn?: dayjs.Dayjs;
  expiresOn?: dayjs.Dayjs | null;
  effectiveStart?: dayjs.Dayjs | null;
  effectiveEnd?: dayjs.Dayjs | null;
  application?: IApplicationInstance | null;
}

export class ProcessStatus implements IProcessStatus {
  constructor(
    public id?: number,
    public status?: ProcessStatusEnum,
    public statusDescription?: string | null,
    public finalState?: boolean,
    public userActionRequired?: boolean,
    public decisionMadeOn?: dayjs.Dayjs,
    public expiresOn?: dayjs.Dayjs | null,
    public effectiveStart?: dayjs.Dayjs | null,
    public effectiveEnd?: dayjs.Dayjs | null,
    public application?: IApplicationInstance | null
  ) {
    this.finalState = this.finalState ?? false;
    this.userActionRequired = this.userActionRequired ?? false;
  }
}

export function getProcessStatusIdentifier(processStatus: IProcessStatus): number | undefined {
  return processStatus.id;
}
