import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocument, getDocumentIdentifier } from '../model/document.model';

export type EntityResponseType = HttpResponse<IDocument>;
export type EntityArrayResponseType = HttpResponse<IDocument[]>;

@Injectable({ providedIn: 'root' })
export class DocumentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/documents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(document: IDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(document);
    return this.http
      .post<IDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(document: IDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(document);
    return this.http
      .put<IDocument>(`${this.resourceUrl}/${getDocumentIdentifier(document) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(document: IDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(document);
    return this.http
      .patch<IDocument>(`${this.resourceUrl}/${getDocumentIdentifier(document) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDocumentToCollectionIfMissing(documentCollection: IDocument[], ...documentsToCheck: (IDocument | null | undefined)[]): IDocument[] {
    const documents: IDocument[] = documentsToCheck.filter(isPresent);
    if (documents.length > 0) {
      const documentCollectionIdentifiers = documentCollection.map(documentItem => getDocumentIdentifier(documentItem)!);
      const documentsToAdd = documents.filter(documentItem => {
        const documentIdentifier = getDocumentIdentifier(documentItem);
        if (documentIdentifier == null || documentCollectionIdentifiers.includes(documentIdentifier)) {
          return false;
        }
        documentCollectionIdentifiers.push(documentIdentifier);
        return true;
      });
      return [...documentsToAdd, ...documentCollection];
    }
    return documentCollection;
  }

  protected convertDateFromClient(document: IDocument): IDocument {
    return Object.assign({}, document, {
      sentDate: document.sentDate?.isValid() ? document.sentDate.toJSON() : undefined
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
      res.body.forEach((document: IDocument) => {
        document.sentDate = document.sentDate ? dayjs(document.sentDate) : undefined;
      });
    }
    return res;
  }
}
