import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { communicationsData } from './data';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsMockApi {
  constructor(private _fuseMockApiService: FuseMockApiService) {
    this.registerHandlers();
  }

  registerHandlers(): void {
    this._fuseMockApiService.onGet('api/application1/communications').reply(() => [200, communicationsData['application1']]);

    this._fuseMockApiService.onGet('api/application2/communications').reply(() => [200, communicationsData['application1']]);
  }
}
