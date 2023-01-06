import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MockApiService } from 'app/mock-api/mock-api.service';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';
import { GENDER } from 'app/modules/profile/enumerations/gender.model';
import { ICustomer } from '../../../modules/profile/model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerMockApi extends MockApiServiceBase {
  protected customerDB: any[] = [...this.getMockData()];
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService) {
    super('CustomerMockApi');
    this.checkAndregisterHandlers(() => {
      // post - /api/customers
      this._fuseMockApiService.onPost('api/customers').reply(({ request }) => [200, this.add(request.body)]);

      // put - /api/customers/:id
      this._fuseMockApiService.onPut('api/customers/:id').reply(({ request }) => [200, this.update(request.body)]);

      // patch - /api/customers/:id
      this._fuseMockApiService.onPatch('api/customers/:id').reply(({ request }) => [200, this.update(request.body)]);

      // get - /api/customers }
      this._fuseMockApiService.onGet('api/customers').reply(({ request }) => [200, this.search(new Map())]);

      // get - /api/customers/{id}
      this._fuseMockApiService.onGet('api/customers/:id').reply(({ request }) => {
        let id: any = 58998;
        if (request.url && request.url.includes('/')) {
          id = request.url.split('/')[request.url.split('/').length - 1];
        }
        return [200, this.searchById(id)];
      });

      // delete - /api/customers/{id}
      this._fuseMockApiService.onDelete('api/customers/:id').reply(({ request }) => {
        let id: any = 71085;
        if (request.url && request.url.includes('/')) {
          id = request.url.split('/')[request.url.split('/').length - 1];
        }
        this.delete(id);
        return [204, []];
      });
    });
  }

  add(customer: ICustomer): ICustomer {
    customer.id = 36596;
    this.customerDB.push(customer);
    return customer;
  }

  update(customer: ICustomer): ICustomer {
    this.customerDB.push(customer);
    return customer;
  }

  delete(id: any): void {
    const found = this.customerDB.filter(eachcustomer => eachcustomer.id === id);
    if (found && found[0] && this.customerDB.indexOf(found[0]) > 0) {
      this.customerDB.splice(this.customerDB.indexOf(found[0]), 1);
    }
  }

  search(map: Map<string, string>): ICustomer[] {
    return map && map.size === 0 ? this.customerDB : [this.customerDB[0]];
  }

  searchById(id: any): ICustomer[] {
    return this.customerDB.filter(eachcustomer => eachcustomer.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getMockData() {
    return [
      {
        id: 16361,
        firstName: 'Everett',
        middleName: 'generation',
        lastName: 'Considine',
        dob: '2022-12-05',
        gender: GENDER.FEMALE
      }
    ];
  }
}
