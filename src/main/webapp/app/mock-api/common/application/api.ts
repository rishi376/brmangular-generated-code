import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MockApiService } from 'app/mock-api/mock-api.service';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';
import { ApplicationInstanceEnum } from 'app/modules/application/enumerations/application-instance-enum.model';
import { ApplicationReasonEnum } from 'app/modules/application/enumerations/application-reason-enum.model';
import { IApplicationInstance } from '../../../modules/application/model/application-instance.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFunctionalityMockApi extends MockApiServiceBase {
  protected applicationInstanceDB: any[] = [...this.getMockData()];
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService) {
    super('ApplicationFunctionalityMockApi');
    this.checkAndregisterHandlers(() => {
      this._fuseMockApiService.onGet('api/application-instances').reply(({ request }) => {
        if (!this.mockApiService.getLoggedInUser()) {
          return [404, false];
        } else {
          // TODO: Make this part based on the request object
          return [200, [this.getMockData()]];
        }
      });
    });
  }

  add(applicationInstance: IApplicationInstance): IApplicationInstance {
    applicationInstance.id = 14923;
    this.applicationInstanceDB.push(applicationInstance);
    return applicationInstance;
  }

  update(applicationInstance: IApplicationInstance): IApplicationInstance {
    this.applicationInstanceDB.push(applicationInstance);
    return applicationInstance;
  }

  delete(id: any): void {
    const found = this.applicationInstanceDB.filter(eachapplicationInstance => eachapplicationInstance.id === id);
    if (found && found[0] && this.applicationInstanceDB.indexOf(found[0]) > 0) {
      this.applicationInstanceDB.splice(this.applicationInstanceDB.indexOf(found[0]), 1);
    }
  }

  search(map: Map<string, string>): IApplicationInstance[] {
    return map && map.size === 0 ? this.applicationInstanceDB : [this.applicationInstanceDB[0]];
  }

  searchById(id: any): IApplicationInstance[] {
    return this.applicationInstanceDB.filter(eachapplicationInstance => eachapplicationInstance.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getMockData() {
    return [
      {
        id: 65360,
        appInstanceId: 'Solutions 24/7 bottom-line',
        status: ApplicationInstanceEnum.WITHDRAWN,
        initiatedBy: 'bandwidth Rustic',
        submittedBy: 'Madagascar',
        reason: ApplicationReasonEnum.USER_UPDATE,
        createdOn: '2022-12-05T16:18',
        submittedOn: '2022-12-06T03:22',
        currentNavigationState: 'olive invoice haptic'
      }
    ];
  }
}
