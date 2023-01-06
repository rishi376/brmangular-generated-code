import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ApplicationInstanceEnum } from 'app/modules/application/enumerations/application-instance-enum.model';
import { ApplicationReasonEnum } from 'app/modules/application/enumerations/application-reason-enum.model';
import { IApplicationInstance, ApplicationInstance } from '../model/application-instance.model';

import { ApplicationInstanceService } from './application-instance.service';

describe('ApplicationInstance Service', () => {
  let service: ApplicationInstanceService;
  let httpMock: HttpTestingController;
  let elemDefault: IApplicationInstance;
  let expectedResult: IApplicationInstance | IApplicationInstance[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    expectedResult = null;
    service = TestBed.inject(ApplicationInstanceService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      appInstanceId: 'AAAAAAA',
      status: ApplicationInstanceEnum.WIP,
      initiatedBy: 'AAAAAAA',
      submittedBy: 'AAAAAAA',
      reason: ApplicationReasonEnum.FIRST_APPLICATION,
      createdOn: currentDate,
      submittedOn: currentDate,
      currentNavigationState: 'AAAAAAA'
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          createdOn: currentDate.format(DATE_TIME_FORMAT),
          submittedOn: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ApplicationInstance', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          createdOn: currentDate.format(DATE_TIME_FORMAT),
          submittedOn: currentDate.format(DATE_TIME_FORMAT)
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdOn: currentDate,
          submittedOn: currentDate
        },
        returnedFromService
      );

      service.create(new ApplicationInstance()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ApplicationInstance', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          appInstanceId: 'BBBBBB',
          status: 'BBBBBB',
          initiatedBy: 'BBBBBB',
          submittedBy: 'BBBBBB',
          reason: 'BBBBBB',
          createdOn: currentDate.format(DATE_TIME_FORMAT),
          submittedOn: currentDate.format(DATE_TIME_FORMAT),
          currentNavigationState: 'BBBBBB'
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdOn: currentDate,
          submittedOn: currentDate
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ApplicationInstance', () => {
      const patchObject = Object.assign(
        {
          appInstanceId: 'BBBBBB',
          status: 'BBBBBB',
          createdOn: currentDate.format(DATE_TIME_FORMAT),
          submittedOn: currentDate.format(DATE_TIME_FORMAT)
        },
        new ApplicationInstance()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          createdOn: currentDate,
          submittedOn: currentDate
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ApplicationInstance', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          appInstanceId: 'BBBBBB',
          status: 'BBBBBB',
          initiatedBy: 'BBBBBB',
          submittedBy: 'BBBBBB',
          reason: 'BBBBBB',
          createdOn: currentDate.format(DATE_TIME_FORMAT),
          submittedOn: currentDate.format(DATE_TIME_FORMAT),
          currentNavigationState: 'BBBBBB'
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdOn: currentDate,
          submittedOn: currentDate
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ApplicationInstance', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addApplicationInstanceToCollectionIfMissing', () => {
      it('should add a ApplicationInstance to an empty array', () => {
        const applicationInstance: IApplicationInstance = { id: 123 };
        expectedResult = service.addApplicationInstanceToCollectionIfMissing([], applicationInstance);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(applicationInstance);
      });

      it('should not add a ApplicationInstance to an array that contains it', () => {
        const applicationInstance: IApplicationInstance = { id: 123 };
        const applicationInstanceCollection: IApplicationInstance[] = [
          {
            ...applicationInstance
          },
          { id: 456 }
        ];
        expectedResult = service.addApplicationInstanceToCollectionIfMissing(applicationInstanceCollection, applicationInstance);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ApplicationInstance to an array that doesn't contain it", () => {
        const applicationInstance: IApplicationInstance = { id: 123 };
        const applicationInstanceCollection: IApplicationInstance[] = [{ id: 456 }];
        expectedResult = service.addApplicationInstanceToCollectionIfMissing(applicationInstanceCollection, applicationInstance);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(applicationInstance);
      });

      it('should add only unique ApplicationInstance to an array', () => {
        const applicationInstanceArray: IApplicationInstance[] = [{ id: 123 }, { id: 456 }, { id: 54389 }];
        const applicationInstanceCollection: IApplicationInstance[] = [{ id: 123 }];
        expectedResult = service.addApplicationInstanceToCollectionIfMissing(applicationInstanceCollection, ...applicationInstanceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const applicationInstance: IApplicationInstance = { id: 123 };
        const applicationInstance2: IApplicationInstance = { id: 456 };
        expectedResult = service.addApplicationInstanceToCollectionIfMissing([], applicationInstance, applicationInstance2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(applicationInstance);
        expect(expectedResult).toContain(applicationInstance2);
      });

      it('should accept null and undefined values', () => {
        const applicationInstance: IApplicationInstance = { id: 123 };
        expectedResult = service.addApplicationInstanceToCollectionIfMissing([], null, applicationInstance, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(applicationInstance);
      });

      it('should return initial array if no ApplicationInstance is added', () => {
        const applicationInstanceCollection: IApplicationInstance[] = [{ id: 123 }];
        expectedResult = service.addApplicationInstanceToCollectionIfMissing(applicationInstanceCollection, undefined, null);
        expect(expectedResult).toEqual(applicationInstanceCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
