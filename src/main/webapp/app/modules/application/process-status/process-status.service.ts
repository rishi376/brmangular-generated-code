import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProcessStatus, getProcessStatusIdentifier } from '../model/process-status.model';

export type EntityResponseType = HttpResponse<IProcessStatus>;
export type EntityArrayResponseType = HttpResponse<IProcessStatus[]>;

@Injectable({ providedIn: 'root' })
export class ProcessStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/process-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(processStatus: IProcessStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processStatus);
    return this.http
      .post<IProcessStatus>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(processStatus: IProcessStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processStatus);
    return this.http
      .put<IProcessStatus>(`${this.resourceUrl}/${getProcessStatusIdentifier(processStatus) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(processStatus: IProcessStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processStatus);
    return this.http
      .patch<IProcessStatus>(`${this.resourceUrl}/${getProcessStatusIdentifier(processStatus) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProcessStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProcessStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProcessStatusToCollectionIfMissing(
    processStatusCollection: IProcessStatus[],
    ...processStatusesToCheck: (IProcessStatus | null | undefined)[]
  ): IProcessStatus[] {
    const processStatuses: IProcessStatus[] = processStatusesToCheck.filter(isPresent);
    if (processStatuses.length > 0) {
      const processStatusCollectionIdentifiers = processStatusCollection.map(
        processStatusItem => getProcessStatusIdentifier(processStatusItem)!
      );
      const processStatusesToAdd = processStatuses.filter(processStatusItem => {
        const processStatusIdentifier = getProcessStatusIdentifier(processStatusItem);
        if (processStatusIdentifier == null || processStatusCollectionIdentifiers.includes(processStatusIdentifier)) {
          return false;
        }
        processStatusCollectionIdentifiers.push(processStatusIdentifier);
        return true;
      });
      return [...processStatusesToAdd, ...processStatusCollection];
    }
    return processStatusCollection;
  }

  protected convertDateFromClient(processStatus: IProcessStatus): IProcessStatus {
    return Object.assign({}, processStatus, {
      decisionMadeOn: processStatus.decisionMadeOn?.isValid() ? processStatus.decisionMadeOn.toJSON() : undefined,
      expiresOn: processStatus.expiresOn?.isValid() ? processStatus.expiresOn.toJSON() : undefined,
      effectiveStart: processStatus.effectiveStart?.isValid() ? processStatus.effectiveStart.toJSON() : undefined,
      effectiveEnd: processStatus.effectiveEnd?.isValid() ? processStatus.effectiveEnd.toJSON() : undefined
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.decisionMadeOn = res.body.decisionMadeOn ? dayjs(res.body.decisionMadeOn) : undefined;
      res.body.expiresOn = res.body.expiresOn ? dayjs(res.body.expiresOn) : undefined;
      res.body.effectiveStart = res.body.effectiveStart ? dayjs(res.body.effectiveStart) : undefined;
      res.body.effectiveEnd = res.body.effectiveEnd ? dayjs(res.body.effectiveEnd) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((processStatus: IProcessStatus) => {
        processStatus.decisionMadeOn = processStatus.decisionMadeOn ? dayjs(processStatus.decisionMadeOn) : undefined;
        processStatus.expiresOn = processStatus.expiresOn ? dayjs(processStatus.expiresOn) : undefined;
        processStatus.effectiveStart = processStatus.effectiveStart ? dayjs(processStatus.effectiveStart) : undefined;
        processStatus.effectiveEnd = processStatus.effectiveEnd ? dayjs(processStatus.effectiveEnd) : undefined;
      });
    }
    return res;
  }
}
