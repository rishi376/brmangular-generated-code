import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { CorrespondenceStatusEnum } from 'app/modules/application/enumerations/correspondence-status-enum.model';
import { CorrespondenceTypeEnum } from 'app/modules/application/enumerations/correspondence-type-enum.model';
import { ICorrespondence, Correspondence } from '../model/correspondence.model';

import { CorrespondenceService } from './correspondence.service';

describe('Correspondence Service', () => {
  let service: CorrespondenceService;
  let httpMock: HttpTestingController;
  let elemDefault: ICorrespondence;
  let expectedResult: ICorrespondence | ICorrespondence[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    expectedResult = null;
    service = TestBed.inject(CorrespondenceService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      status: CorrespondenceStatusEnum.TRIGGERED,
      type: CorrespondenceTypeEnum.RECEIVED,
      statusDescription: 'AAAAAAA',
      sentDate: currentDate,
      documentNumber: 0,
      templateId: 0,
      metaDataId: 0,
      documentContentType: 'image/png',
      document: 'AAAAAAA'
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          sentDate: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Correspondence', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          sentDate: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          sentDate: currentDate
        },
        returnedFromService
      );

      service.create(new Correspondence()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Correspondence', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          status: 'BBBBBB',
          type: 'BBBBBB',
          statusDescription: 'BBBBBB',
          sentDate: currentDate.format(DATE_TIME_FORMAT),
          documentNumber: 1,
          templateId: 1,
          metaDataId: 1,
          document: 'BBBBBB'
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          sentDate: currentDate
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Correspondence', () => {
      const patchObject = Object.assign(
        {
          type: 'BBBBBB',
          statusDescription: 'BBBBBB',
          templateId: 1,
          metaDataId: 1
        },
        new Correspondence()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          sentDate: currentDate
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Correspondence', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          status: 'BBBBBB',
          type: 'BBBBBB',
          statusDescription: 'BBBBBB',
          sentDate: currentDate.format(DATE_TIME_FORMAT),
          documentNumber: 1,
          templateId: 1,
          metaDataId: 1,
          document: 'BBBBBB'
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          sentDate: currentDate
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Correspondence', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCorrespondenceToCollectionIfMissing', () => {
      it('should add a Correspondence to an empty array', () => {
        const correspondence: ICorrespondence = { id: 123 };
        expectedResult = service.addCorrespondenceToCollectionIfMissing([], correspondence);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(correspondence);
      });

      it('should not add a Correspondence to an array that contains it', () => {
        const correspondence: ICorrespondence = { id: 123 };
        const correspondenceCollection: ICorrespondence[] = [
          {
            ...correspondence
          },
          { id: 456 }
        ];
        expectedResult = service.addCorrespondenceToCollectionIfMissing(correspondenceCollection, correspondence);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Correspondence to an array that doesn't contain it", () => {
        const correspondence: ICorrespondence = { id: 123 };
        const correspondenceCollection: ICorrespondence[] = [{ id: 456 }];
        expectedResult = service.addCorrespondenceToCollectionIfMissing(correspondenceCollection, correspondence);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(correspondence);
      });

      it('should add only unique Correspondence to an array', () => {
        const correspondenceArray: ICorrespondence[] = [{ id: 123 }, { id: 456 }, { id: 87447 }];
        const correspondenceCollection: ICorrespondence[] = [{ id: 123 }];
        expectedResult = service.addCorrespondenceToCollectionIfMissing(correspondenceCollection, ...correspondenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const correspondence: ICorrespondence = { id: 123 };
        const correspondence2: ICorrespondence = { id: 456 };
        expectedResult = service.addCorrespondenceToCollectionIfMissing([], correspondence, correspondence2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(correspondence);
        expect(expectedResult).toContain(correspondence2);
      });

      it('should accept null and undefined values', () => {
        const correspondence: ICorrespondence = { id: 123 };
        expectedResult = service.addCorrespondenceToCollectionIfMissing([], null, correspondence, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(correspondence);
      });

      it('should return initial array if no Correspondence is added', () => {
        const correspondenceCollection: ICorrespondence[] = [{ id: 123 }];
        expectedResult = service.addCorrespondenceToCollectionIfMissing(correspondenceCollection, undefined, null);
        expect(expectedResult).toEqual(correspondenceCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
