import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ProcessStatusEnum } from 'app/modules/application/enumerations/process-status-enum.model';
import { IProcessStatus, ProcessStatus } from '../model/process-status.model';

import { ProcessStatusService } from './process-status.service';

describe('ProcessStatus Service', () => {
  let service: ProcessStatusService;
  let httpMock: HttpTestingController;
  let elemDefault: IProcessStatus;
  let expectedResult: IProcessStatus | IProcessStatus[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    expectedResult = null;
    service = TestBed.inject(ProcessStatusService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      status: ProcessStatusEnum.NEW,
      statusDescription: 'AAAAAAA',
      finalState: false,
      userActionRequired: false,
      decisionMadeOn: currentDate,
      expiresOn: currentDate,
      effectiveStart: currentDate,
      effectiveEnd: currentDate
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          decisionMadeOn: currentDate.format(DATE_TIME_FORMAT),
          expiresOn: currentDate.format(DATE_TIME_FORMAT),
          effectiveStart: currentDate.format(DATE_TIME_FORMAT),
          effectiveEnd: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ProcessStatus', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          decisionMadeOn: currentDate.format(DATE_TIME_FORMAT),
          expiresOn: currentDate.format(DATE_TIME_FORMAT),
          effectiveStart: currentDate.format(DATE_TIME_FORMAT),
          effectiveEnd: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          decisionMadeOn: currentDate,
          expiresOn: currentDate,
          effectiveStart: currentDate,
          effectiveEnd: currentDate
        },
        returnedFromService
      );

      service.create(new ProcessStatus()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProcessStatus', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          status: 'BBBBBB',
          statusDescription: 'BBBBBB',
          finalState: true,
          userActionRequired: true,
          decisionMadeOn: currentDate.format(DATE_TIME_FORMAT),
          expiresOn: currentDate.format(DATE_TIME_FORMAT),
          effectiveStart: currentDate.format(DATE_TIME_FORMAT),
          effectiveEnd: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          decisionMadeOn: currentDate,
          expiresOn: currentDate,
          effectiveStart: currentDate,
          effectiveEnd: currentDate
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProcessStatus', () => {
      const patchObject = Object.assign(
        {
          status: 'BBBBBB',
          statusDescription: 'BBBBBB',
          expiresOn: currentDate.format(DATE_TIME_FORMAT),
          effectiveStart: currentDate.format(DATE_TIME_FORMAT)
        },
        new ProcessStatus()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          decisionMadeOn: currentDate,
          expiresOn: currentDate,
          effectiveStart: currentDate,
          effectiveEnd: currentDate
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProcessStatus', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          status: 'BBBBBB',
          statusDescription: 'BBBBBB',
          finalState: true,
          userActionRequired: true,
          decisionMadeOn: currentDate.format(DATE_TIME_FORMAT),
          expiresOn: currentDate.format(DATE_TIME_FORMAT),
          effectiveStart: currentDate.format(DATE_TIME_FORMAT),
          effectiveEnd: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          decisionMadeOn: currentDate,
          expiresOn: currentDate,
          effectiveStart: currentDate,
          effectiveEnd: currentDate
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ProcessStatus', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProcessStatusToCollectionIfMissing', () => {
      it('should add a ProcessStatus to an empty array', () => {
        const processStatus: IProcessStatus = { id: 123 };
        expectedResult = service.addProcessStatusToCollectionIfMissing([], processStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processStatus);
      });

      it('should not add a ProcessStatus to an array that contains it', () => {
        const processStatus: IProcessStatus = { id: 123 };
        const processStatusCollection: IProcessStatus[] = [
          {
            ...processStatus
          },
          { id: 456 }
        ];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, processStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProcessStatus to an array that doesn't contain it", () => {
        const processStatus: IProcessStatus = { id: 123 };
        const processStatusCollection: IProcessStatus[] = [{ id: 456 }];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, processStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processStatus);
      });

      it('should add only unique ProcessStatus to an array', () => {
        const processStatusArray: IProcessStatus[] = [{ id: 123 }, { id: 456 }, { id: 33014 }];
        const processStatusCollection: IProcessStatus[] = [{ id: 123 }];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, ...processStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const processStatus: IProcessStatus = { id: 123 };
        const processStatus2: IProcessStatus = { id: 456 };
        expectedResult = service.addProcessStatusToCollectionIfMissing([], processStatus, processStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processStatus);
        expect(expectedResult).toContain(processStatus2);
      });

      it('should accept null and undefined values', () => {
        const processStatus: IProcessStatus = { id: 123 };
        expectedResult = service.addProcessStatusToCollectionIfMissing([], null, processStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processStatus);
      });

      it('should return initial array if no ProcessStatus is added', () => {
        const processStatusCollection: IProcessStatus[] = [{ id: 123 }];
        expectedResult = service.addProcessStatusToCollectionIfMissing(processStatusCollection, undefined, null);
        expect(expectedResult).toEqual(processStatusCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
