import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { pdfLinks } from './data';

@Injectable({
  providedIn: 'root'
})
export class UserAgreementMockApi {
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ User - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/application1/useragreement').reply(() => [200, pdfLinks.application1]);

    this._fuseMockApiService.onGet('api/application2/useragreement').reply(() => [200, pdfLinks.application2]);
  }
}
