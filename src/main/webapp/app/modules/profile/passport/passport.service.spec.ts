import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { PASSPORTTYPE } from 'app/modules/profile/enumerations/passporttype.model';
import { IPassport, Passport } from '../model/passport.model';

import { PassportService } from './passport.service';

describe('Passport Service', () => {
  let service: PassportService;
  let httpMock: HttpTestingController;
  let elemDefault: IPassport;
  let expectedResult: IPassport | IPassport[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    expectedResult = null;
    service = TestBed.inject(PassportService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      identity: 'AAAAAAA',
      expiry: currentDate,
      issuingCountry: 'AAAAAAA',
      documentNumber: 'AAAAAAA',
      passportType: PASSPORTTYPE.DIPLOMATIC
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          expiry: currentDate.format(DATE_FORMAT)
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Passport', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          expiry: currentDate.format(DATE_FORMAT)
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          expiry: currentDate
        },
        returnedFromService
      );

      service.create(new Passport()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Passport', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          identity: 'BBBBBB',
          expiry: currentDate.format(DATE_FORMAT),
          issuingCountry: 'BBBBBB',
          documentNumber: 'BBBBBB',
          passportType: 'BBBBBB'
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          expiry: currentDate
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Passport', () => {
      const patchObject = Object.assign(
        {
          identity: 'BBBBBB',
          issuingCountry: 'BBBBBB',
          passportType: 'BBBBBB'
        },
        new Passport()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          expiry: currentDate
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Passport', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          identity: 'BBBBBB',
          expiry: currentDate.format(DATE_FORMAT),
          issuingCountry: 'BBBBBB',
          documentNumber: 'BBBBBB',
          passportType: 'BBBBBB'
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          expiry: currentDate
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Passport', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPassportToCollectionIfMissing', () => {
      it('should add a Passport to an empty array', () => {
        const passport: IPassport = { id: 123 };
        expectedResult = service.addPassportToCollectionIfMissing([], passport);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(passport);
      });

      it('should not add a Passport to an array that contains it', () => {
        const passport: IPassport = { id: 123 };
        const passportCollection: IPassport[] = [
          {
            ...passport
          },
          { id: 456 }
        ];
        expectedResult = service.addPassportToCollectionIfMissing(passportCollection, passport);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Passport to an array that doesn't contain it", () => {
        const passport: IPassport = { id: 123 };
        const passportCollection: IPassport[] = [{ id: 456 }];
        expectedResult = service.addPassportToCollectionIfMissing(passportCollection, passport);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(passport);
      });

      it('should add only unique Passport to an array', () => {
        const passportArray: IPassport[] = [{ id: 123 }, { id: 456 }, { id: 52957 }];
        const passportCollection: IPassport[] = [{ id: 123 }];
        expectedResult = service.addPassportToCollectionIfMissing(passportCollection, ...passportArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const passport: IPassport = { id: 123 };
        const passport2: IPassport = { id: 456 };
        expectedResult = service.addPassportToCollectionIfMissing([], passport, passport2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(passport);
        expect(expectedResult).toContain(passport2);
      });

      it('should accept null and undefined values', () => {
        const passport: IPassport = { id: 123 };
        expectedResult = service.addPassportToCollectionIfMissing([], null, passport, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(passport);
      });

      it('should return initial array if no Passport is added', () => {
        const passportCollection: IPassport[] = [{ id: 123 }];
        expectedResult = service.addPassportToCollectionIfMissing(passportCollection, undefined, null);
        expect(expectedResult).toEqual(passportCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
