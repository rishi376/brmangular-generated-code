import { environment } from 'environments/environment';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';

export abstract class MockApiServiceBase {
  private mockApiName: string;

  constructor(name: string) {
    this.mockApiName = name;
  }
  checkAndregisterHandlers(func: any): void {
    if (environment.mockApiConfig.enableMockAPI && !environment.mockApiConfig.disableMockApiFor.includes(this.mockApiName)) {
      func();
    }
  }
}
