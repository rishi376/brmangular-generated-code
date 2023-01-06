import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MockApiService } from 'app/mock-api/mock-api.service';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';
import { PAYMENTTYPE } from 'app/modules/profile/enumerations/paymenttype.model';
import { IPaymentInfo } from '../../../modules/profile/model/payment-info.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentInfoMockApi extends MockApiServiceBase {
  protected paymentInfoDB: any[] = [...this.getMockData()];
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService) {
    super('PaymentInfoMockApi');
    this.checkAndregisterHandlers(() => {
      // post - /api/payment-infos
      this._fuseMockApiService.onPost('api/payment-infos').reply(({ request }) => [200, this.add(request.body)]);

      // put - /api/payment-infos/:id
      this._fuseMockApiService.onPut('api/payment-infos/:id').reply(({ request }) => [200, this.update(request.body)]);

      // patch - /api/payment-infos/:id
      this._fuseMockApiService.onPatch('api/payment-infos/:id').reply(({ request }) => [200, this.update(request.body)]);

      // get - /api/payment-infos }
      this._fuseMockApiService.onGet('api/payment-infos').reply(({ request }) => [200, this.search(new Map())]);

      // get - /api/payment-infos/{id}
      this._fuseMockApiService.onGet('api/payment-infos/:id').reply(({ request }) => {
        let id: any = 68811;
        if (request.url && request.url.includes('/')) {
          id = request.url.split('/')[request.url.split('/').length - 1];
        }
        return [200, this.searchById(id)];
      });

      // delete - /api/payment-infos/{id}
      this._fuseMockApiService.onDelete('api/payment-infos/:id').reply(({ request }) => {
        let id: any = 16692;
        if (request.url && request.url.includes('/')) {
          id = request.url.split('/')[request.url.split('/').length - 1];
        }
        this.delete(id);
        return [204, []];
      });
    });
  }

  add(paymentInfo: IPaymentInfo): IPaymentInfo {
    paymentInfo.id = 66362;
    this.paymentInfoDB.push(paymentInfo);
    return paymentInfo;
  }

  update(paymentInfo: IPaymentInfo): IPaymentInfo {
    this.paymentInfoDB.push(paymentInfo);
    return paymentInfo;
  }

  delete(id: any): void {
    const found = this.paymentInfoDB.filter(eachpaymentInfo => eachpaymentInfo.id === id);
    if (found && found[0] && this.paymentInfoDB.indexOf(found[0]) > 0) {
      this.paymentInfoDB.splice(this.paymentInfoDB.indexOf(found[0]), 1);
    }
  }

  search(map: Map<string, string>): IPaymentInfo[] {
    return map && map.size === 0 ? this.paymentInfoDB : [this.paymentInfoDB[0]];
  }

  searchById(id: any): IPaymentInfo[] {
    return this.paymentInfoDB.filter(eachpaymentInfo => eachpaymentInfo.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getMockData() {
    return [
      {
        id: 4862,
        paymentType: PAYMENTTYPE.DIRECT_PAY,
        pNumber: 55589,
        expiry: '2022-12-06',
        security: 98012
      }
    ];
  }
}
