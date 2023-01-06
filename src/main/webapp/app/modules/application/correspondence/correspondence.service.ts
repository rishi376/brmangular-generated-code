import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICorrespondence, getCorrespondenceIdentifier } from '../model/correspondence.model';

export type EntityResponseType = HttpResponse<ICorrespondence>;
export type EntityArrayResponseType = HttpResponse<ICorrespondence[]>;

@Injectable({ providedIn: 'root' })
export class CorrespondenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/correspondences');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(correspondence: ICorrespondence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(correspondence);
    return this.http
      .post<ICorrespondence>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(correspondence: ICorrespondence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(correspondence);
    return this.http
      .put<ICorrespondence>(`${this.resourceUrl}/${getCorrespondenceIdentifier(correspondence) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(correspondence: ICorrespondence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(correspondence);
    return this.http
      .patch<ICorrespondence>(`${this.resourceUrl}/${getCorrespondenceIdentifier(correspondence) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICorrespondence>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICorrespondence[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCorrespondenceToCollectionIfMissing(
    correspondenceCollection: ICorrespondence[],
    ...correspondencesToCheck: (ICorrespondence | null | undefined)[]
  ): ICorrespondence[] {
    const correspondences: ICorrespondence[] = correspondencesToCheck.filter(isPresent);
    if (correspondences.length > 0) {
      const correspondenceCollectionIdentifiers = correspondenceCollection.map(
        correspondenceItem => getCorrespondenceIdentifier(correspondenceItem)!
      );
      const correspondencesToAdd = correspondences.filter(correspondenceItem => {
        const correspondenceIdentifier = getCorrespondenceIdentifier(correspondenceItem);
        if (correspondenceIdentifier == null || correspondenceCollectionIdentifiers.includes(correspondenceIdentifier)) {
          return false;
        }
        correspondenceCollectionIdentifiers.push(correspondenceIdentifier);
        return true;
      });
      return [...correspondencesToAdd, ...correspondenceCollection];
    }
    return correspondenceCollection;
  }

  protected convertDateFromClient(correspondence: ICorrespondence): ICorrespondence {
    return Object.assign({}, correspondence, {
      sentDate: correspondence.sentDate?.isValid() ? correspondence.sentDate.toJSON() : undefined
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sentDate = res.body.sentDate ? dayjs(res.body.sentDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((correspondence: ICorrespondence) => {
        correspondence.sentDate = correspondence.sentDate ? dayjs(correspondence.sentDate) : undefined;
      });
    }
    return res;
  }
}
