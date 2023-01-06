import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';
import { ProfileSource } from 'app/modules/profile/enumerations/profile-source.model';
import { ProfileStatus } from 'app/modules/profile/enumerations/profile-status.model';
import { ProfileType } from 'app/modules/profile/enumerations/profile-type.model';
import { ProfileVerificationStatus } from 'app/modules/profile/enumerations/profile-verification-status.model';
import { MockApiService } from 'app/mock-api/mock-api.service';
import dayjs from 'dayjs/esm';
import { CustomerMockApi } from './customer.api';
import { PassportMockApi } from './passport.api';

@Injectable({
  providedIn: 'root'
})
export class ProfileMockApi extends MockApiServiceBase {
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService, private customerMockApi: CustomerMockApi, private passportMockApi: PassportMockApi) {
    super('ProfileMockApi');
    this.checkAndregisterHandlers(() => {
      // get - /api/profiles
      this._fuseMockApiService.onGet('api/profiles/info').reply(({ request }) => {
        if (request.params.has('userId.in')) {
          if (request.params.get('userId.in')[0] === '1') {
            // For regular user return no Proffile
            return [
              200,
              {
                id: 100,
                profileType: ProfileType.ADMIN,
                profileSource: ProfileSource.REFRRED,
                status: ProfileStatus.CURRENT,
                createdBy: this.mockApiService.getLoggedInUser().login,
                createdDate: dayjs(),
                verificationStatus: ProfileVerificationStatus.INIT,
                user: { id: Number(this.mockApiService.getLoggedInUser().id), login: this.mockApiService.getLoggedInUser().login }
              }
            ];
          } else if (request.params.get('userId.in')[0] === '2') {
            // For regular user return no Proffile
            return [
              200,
              {
                id: 101,
                profileType: ProfileType.USER,
                profileSource: ProfileSource.SELF,
                status: ProfileStatus.NEW,
                createdBy: this.mockApiService.getLoggedInUser().login,
                createdDate: dayjs(),
                verificationStatus: ProfileVerificationStatus.INIT,
                user: { id: Number(this.mockApiService.getLoggedInUser().id), login: this.mockApiService.getLoggedInUser().login }
              }
            ];
          } else {
            // For all other users return existing profile
            const newProfile = {
              id: 102,
              profileType: ProfileType.BACK_OFFICE,
              profileSource: ProfileSource.REFRRED,
              status: ProfileStatus.CURRENT,
              createdBy: this.mockApiService.getLoggedInUser().login,
              createdDate: dayjs(),
              verificationStatus: ProfileVerificationStatus.INIT,
              user: { id: Number(this.mockApiService.getLoggedInUser().id), login: this.mockApiService.getLoggedInUser().login }
            };
            return [200, [newProfile]];
          }
        }
        return [200, []];
      });

      // Changed by rishi
      this._fuseMockApiService.onGet('api/profiles/search').reply(({ request }) => {
        const customerData = this.customerMockApi.getMockData();
        const passportData = this.passportMockApi.getMockData();
        const searchResult = {
          profileId: 1,
          profileType: ProfileType.BACK_OFFICE,
          status: ProfileStatus.CURRENT,
          customer: customerData[0],
          passport: passportData[0],
        }
        return [200, [searchResult]];
      });

      // post - /api/profiles
      this._fuseMockApiService.onPost('api/profiles').reply(({ request }) => {
        const response = cloneDeep(request.body);
        response.id = 777;
        return [200, response];
      });

      this._fuseMockApiService.onPost('api/contact/update').reply(({ request }) => {
        const newMessage = cloneDeep(request.body);
        newMessage.id = FuseMockApiUtils.guid();
        newMessage.success = true;

        return [200, newMessage];
      });

      this._fuseMockApiService.onPost('api/address/update').reply(({ request }) => {
        const newMessage = cloneDeep(request.body);
        newMessage.id = FuseMockApiUtils.guid();
        newMessage.success = true;

        return [200, newMessage];
      });

      this._fuseMockApiService.onPost('api/communication-preference/update').reply(({ request }) => {
        const newMessage = cloneDeep(request.body);
        newMessage.id = FuseMockApiUtils.guid();
        newMessage.success = true;

        return [200, newMessage];
      });

      this._fuseMockApiService.onPost('api/name/update').reply(({ request }) => {
        const newMessage = cloneDeep(request.body);
        newMessage.id = FuseMockApiUtils.guid();
        newMessage.success = true;

        return [200, newMessage];
      });
    });
    // this.registerHandlers();
  }
}
