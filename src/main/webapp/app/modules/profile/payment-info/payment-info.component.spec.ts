import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

import { PaymentInfoService } from './payment-info.service';
import { IPaymentInfo, PaymentInfo } from '../model/payment-info.model';
import { IProfile } from '../model/profile.model';
import { ProfileService } from '../profile.service';

import { PaymentInfoComponent } from './payment-info.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('PaymentInfo Management Update Component', () => {
  let comp: PaymentInfoComponent;
  let fixture: ComponentFixture<PaymentInfoComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentInfoService: PaymentInfoService;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ReactiveFormsModule, MatDialogModule],
      declarations: [PaymentInfoComponent],
      providers: [
        SessionStorageService,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}])
          }
        }
      ]
    })
      .overrideTemplate(PaymentInfoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentInfoComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentInfoService = TestBed.inject(PaymentInfoService);
    profileService = TestBed.inject(ProfileService);

    comp = fixture.componentInstance;
  });

  describe('ngOnChanges', () => {
    it('Should query available paymentInfo in service with updated profile.id', () => {
      // GIVEN
      comp.profile = { id: 123 };
      const paymentInfo: IPaymentInfo[] = [{ id: 456 }];
      jest.spyOn(paymentInfoService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInfo })));

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(paymentInfoService.query).toHaveBeenCalled();
      expect(paymentInfoService.query).toHaveBeenCalledWith({ 'profileId.in': 123 });
      expect(comp.paymentinfoForms.at(0).value).toEqual(expect.objectContaining(paymentInfo[0]));
    });
    it('Should query unavailable paymentInfo in service with updated profile.id', () => {
      // GIVEN
      comp.profile = { id: 123 };
      jest.spyOn(paymentInfoService, 'query').mockReturnValue(of(new HttpResponse({ body: [] })));

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(paymentInfoService.query).toHaveBeenCalled();
      expect(paymentInfoService.query).toHaveBeenCalledWith({ 'profileId.in': 123 });
      expect(comp.paymentinfoForms.length).toBe(0);
    });
  });

  /* TODO: SEE IF REQUIRED or Get this part working
    describe('ngOnInit', () => {
        it('Should call Profile query and add missing value', () => {
                const paymentInfo : IPaymentInfo = {"id":456};
                const profile : IProfile = {"id":12686};
                paymentInfo.profile = profile;

                const profileCollection: IProfile[] = [{"id":96823}];
                jest.spyOn(profileService, 'query').mockReturnValue(of(new HttpResponse({ body: profileCollection })));
                const additionalProfiles = [
                    profile,
                ];
                const expectedCollection: IProfile[] = [...additionalProfiles, ...profileCollection];
                jest.spyOn(profileService, 'addProfileToCollectionIfMissing').mockReturnValue(expectedCollection);

                activatedRoute.data = of({ paymentInfo });
                comp.ngOnInit();

                expect(profileService.query).toHaveBeenCalled();
                expect(profileService.addProfileToCollectionIfMissing).toHaveBeenCalledWith(profileCollection, ...additionalProfiles);
                expect(comp.profilesSharedCollection).toEqual(expectedCollection);
        });

        it('Should update editForm', () => {
            const paymentInfo: IPaymentInfo = {"id":456};
            const profile: IProfile = {"id":53951};
            paymentInfo.profile = profile;

            activatedRoute.data = of({ paymentInfo });
            comp.ngOnInit();

            expect(comp.paymentinfoForm.value).toEqual(expect.objectContaining(paymentInfo));
            expect(comp.profilesSharedCollection).toContain(profile);
        });
    });
*/
  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PaymentInfo>>();
      const paymentInfo = { id: 123 };
      comp.addNew();
      comp.paymentinfoForms.at(0).patchValue(paymentInfo);
      jest.spyOn(paymentInfoService, 'update').mockReturnValue(saveSubject);

      // WHEN
      comp.save(0);
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentInfo }));
      saveSubject.complete();

      // THEN
      expect(paymentInfoService.update).toHaveBeenCalledWith(expect.objectContaining(paymentInfo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PaymentInfo>>();
      const paymentInfo = new PaymentInfo();
      comp.addNew();
      comp.paymentinfoForms.at(0).patchValue(paymentInfo);
      jest.spyOn(paymentInfoService, 'create').mockReturnValue(saveSubject);

      // WHEN
      comp.save(0);
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentInfo }));
      saveSubject.complete();

      // THEN
      expect(paymentInfoService.create).toHaveBeenCalledWith(expect.objectContaining(paymentInfo));
      expect(comp.isSaving).toEqual(false);
    });
    /* TODO: take care of this part
        it('Should set isSaving to false on error', () => {
            // GIVEN
            const saveSubject = new Subject<HttpResponse<PaymentInfo>>();
            const paymentInfo = {"id":123};
            jest.spyOn(paymentInfoService, 'update').mockReturnValue(saveSubject);
            jest.spyOn(comp, 'previousState');
            activatedRoute.data = of({ paymentInfo });
            comp.ngOnInit();

            // WHEN
            comp.save();
            expect(comp.isSaving).toEqual(true);
            saveSubject.error('This is an error!');

            // THEN
            expect(paymentInfoService.update).toHaveBeenCalledWith(paymentInfo);
            expect(comp.isSaving).toEqual(false);
            expect(comp.previousState).not.toHaveBeenCalled();
        });
        */
  });
  /*

    describe('Tracking relationships identifiers', () => {
        describe('trackProfileById', () => {
            it('Should return tracked Profile primary key', () => {
                const entity = {"id":123};
                const trackResult = comp.trackProfileById(0, entity);
                expect(trackResult).toEqual(entity.id);
            });
        });

    });
*/
  /*
   */
});
