import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MockApiService } from 'app/mock-api/mock-api.service';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';

@Injectable({
  providedIn: 'root'
})
export class AccountMockAPI extends MockApiServiceBase {
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService) {
    super('AccountMockAPI');
    // Register Mock API handlers
    this.checkAndregisterHandlers(() => {
      this._fuseMockApiService.onGet('api/account').reply(({ request }) => {
        console.log('mock for api/account being called');
        if (!this.mockApiService.getLoggedInUser()) {
          return [404, false];
        } else {
          return [200, cloneDeep(this.mockApiService.getLoggedInUser())];
        }
      });
    });
  }
}
