import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MockApiService } from 'app/mock-api/mock-api.service';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';
import { PASSPORTTYPE } from 'app/modules/profile/enumerations/passporttype.model';
import { IPassport } from '../../../modules/profile/model/passport.model';

@Injectable({
  providedIn: 'root'
})
export class PassportMockApi extends MockApiServiceBase {
  protected passportDB: any[] = [...this.getMockData()];
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService) {
    super('PassportMockApi');
    this.checkAndregisterHandlers(() => {
      // post - /api/passports
      this._fuseMockApiService.onPost('api/passports').reply(({ request }) => [200, this.add(request.body)]);

      // put - /api/passports/:id
      this._fuseMockApiService.onPut('api/passports/:id').reply(({ request }) => [200, this.update(request.body)]);

      // patch - /api/passports/:id
      this._fuseMockApiService.onPatch('api/passports/:id').reply(({ request }) => [200, this.update(request.body)]);

      // get - /api/passports }
      this._fuseMockApiService.onGet('api/passports').reply(({ request }) => [200, this.search(new Map())]);

      // get - /api/passports/{id}
      this._fuseMockApiService.onGet('api/passports/:id').reply(({ request }) => {
        let id: any = 7814;
        if (request.url && request.url.includes('/')) {
          id = request.url.split('/')[request.url.split('/').length - 1];
        }
        return [200, this.searchById(id)];
      });

      // delete - /api/passports/{id}
      this._fuseMockApiService.onDelete('api/passports/:id').reply(({ request }) => {
        let id: any = 68348;
        if (request.url && request.url.includes('/')) {
          id = request.url.split('/')[request.url.split('/').length - 1];
        }
        this.delete(id);
        return [204, []];
      });
    });
  }

  add(passport: IPassport): IPassport {
    passport.id = 15898;
    this.passportDB.push(passport);
    return passport;
  }

  update(passport: IPassport): IPassport {
    this.passportDB.push(passport);
    return passport;
  }

  delete(id: any): void {
    const found = this.passportDB.filter(eachpassport => eachpassport.id === id);
    if (found && found[0] && this.passportDB.indexOf(found[0]) > 0) {
      this.passportDB.splice(this.passportDB.indexOf(found[0]), 1);
    }
  }

  search(map: Map<string, string>): IPassport[] {
    return map && map.size === 0 ? this.passportDB : [this.passportDB[0]];
  }

  searchById(id: any): IPassport[] {
    return this.passportDB.filter(eachpassport => eachpassport.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getMockData() {
    return [
      {
        id: 84827,
        identity: 'ROI',
        expiry: '2022-12-06',
        issuingCountry: 'copying',
        documentNumber: 'Tajikistan',
        passportType: PASSPORTTYPE.REGULAR
      }
    ];
  }
}
