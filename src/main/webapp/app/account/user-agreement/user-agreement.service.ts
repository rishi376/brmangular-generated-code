import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAgreementService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getPdfLink(applicationName: string): Observable<string> {
    return this.http.get<string>(this.applicationConfigService.getEndpointFor(`api/${applicationName}/useragreement`));
  }
}
