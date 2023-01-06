import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PasswordResetInitService } from './password-reset-init.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('PasswordResetInit Service', () => {
  let service: PasswordResetInitService;
  let httpMock: HttpTestingController;
  let applicationConfigService: ApplicationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    });

    service = TestBed.inject(PasswordResetInitService);
    applicationConfigService = TestBed.inject(ApplicationConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service methods', () => {
    it('should call reset-password/init endpoint with correct values', () => {
      // GIVEN
      const mail = 'test@test.com';

      // WHEN
      service.save(mail).subscribe();

      const testRequest = httpMock.expectOne({
        method: 'POST',
        url: applicationConfigService.getEndpointFor('api/account/reset-password/init')
      });

      // THEN
      expect(testRequest.request.body).toEqual(mail);
    });
  });
});
