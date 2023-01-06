import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';

@Injectable({
  providedIn: 'root'
})
export class AccountAdminMockApi extends MockApiServiceBase {
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    super('');
    // Register Mock API handlers
    this.checkAndregisterHandlers(() => {
      // -----------------------------------------------------------------------------------------------------
      // @ User - GET
      // -----------------------------------------------------------------------------------------------------
      this._fuseMockApiService.onGet('api/signup').reply(() => [201, true]);

      this._fuseMockApiService.onPost('api/register').reply(() => [201, true]);
    });
  }
}
