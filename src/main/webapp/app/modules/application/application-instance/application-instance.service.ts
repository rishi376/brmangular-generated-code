import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApplicationInstance, getApplicationInstanceIdentifier } from '../model/application-instance.model';

export type EntityResponseType = HttpResponse<IApplicationInstance>;
export type EntityArrayResponseType = HttpResponse<IApplicationInstance[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationInstanceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/application-instances');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(applicationInstance: IApplicationInstance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationInstance);
    return this.http
      .post<IApplicationInstance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(applicationInstance: IApplicationInstance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationInstance);
    return this.http
      .put<IApplicationInstance>(`${this.resourceUrl}/${getApplicationInstanceIdentifier(applicationInstance) as number}`, copy, {
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(applicationInstance: IApplicationInstance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationInstance);
    return this.http
      .patch<IApplicationInstance>(`${this.resourceUrl}/${getApplicationInstanceIdentifier(applicationInstance) as number}`, copy, {
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApplicationInstance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApplicationInstance[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApplicationInstanceToCollectionIfMissing(
    applicationInstanceCollection: IApplicationInstance[],
    ...applicationInstancesToCheck: (IApplicationInstance | null | undefined)[]
  ): IApplicationInstance[] {
    const applicationInstances: IApplicationInstance[] = applicationInstancesToCheck.filter(isPresent);
    if (applicationInstances.length > 0) {
      const applicationInstanceCollectionIdentifiers = applicationInstanceCollection.map(
        applicationInstanceItem => getApplicationInstanceIdentifier(applicationInstanceItem)!
      );
      const applicationInstancesToAdd = applicationInstances.filter(applicationInstanceItem => {
        const applicationInstanceIdentifier = getApplicationInstanceIdentifier(applicationInstanceItem);
        if (applicationInstanceIdentifier == null || applicationInstanceCollectionIdentifiers.includes(applicationInstanceIdentifier)) {
          return false;
        }
        applicationInstanceCollectionIdentifiers.push(applicationInstanceIdentifier);
        return true;
      });
      return [...applicationInstancesToAdd, ...applicationInstanceCollection];
    }
    return applicationInstanceCollection;
  }

  protected convertDateFromClient(applicationInstance: IApplicationInstance): IApplicationInstance {
    return Object.assign({}, applicationInstance, {
      createdOn: applicationInstance.createdOn?.isValid() ? applicationInstance.createdOn.toJSON() : undefined,
      submittedOn: applicationInstance.submittedOn?.isValid() ? applicationInstance.submittedOn.toJSON() : undefined
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdOn = res.body.createdOn ? dayjs(res.body.createdOn) : undefined;
      res.body.submittedOn = res.body.submittedOn ? dayjs(res.body.submittedOn) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((applicationInstance: IApplicationInstance) => {
        applicationInstance.createdOn = applicationInstance.createdOn ? dayjs(applicationInstance.createdOn) : undefined;
        applicationInstance.submittedOn = applicationInstance.submittedOn ? dayjs(applicationInstance.submittedOn) : undefined;
      });
    }
    return res;
  }
}
