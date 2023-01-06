import { ApplicationStatusEnum } from 'app/modules/application/enumerations/application-status-enum.model';

export interface IApplication {
  id?: number;
  name?: string;
  group?: string | null;
  status?: ApplicationStatusEnum;
}

export class Application implements IApplication {
  constructor(public id?: number, public name?: string, public group?: string | null, public status?: ApplicationStatusEnum) {}
}

export function getApplicationIdentifier(application: IApplication): number | undefined {
  return application.id;
}
