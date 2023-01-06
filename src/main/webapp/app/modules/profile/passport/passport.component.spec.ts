import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

import { PassportService } from './passport.service';
import { IPassport, Passport } from '../model/passport.model';
import { IProfile } from '../model/profile.model';
import { ProfileService } from '../profile.service';

import { PassportComponent } from './passport.component';

describe('Passport Management Update Component', () => {
  let comp: PassportComponent;
  let fixture: ComponentFixture<PassportComponent>;
  let activatedRoute: ActivatedRoute;
  let passportService: PassportService;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      declarations: [PassportComponent],
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
      .overrideTemplate(PassportComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PassportComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    passportService = TestBed.inject(PassportService);
    profileService = TestBed.inject(ProfileService);

    comp = fixture.componentInstance;
  });

  describe('ngOnChanges', () => {
    it('Should query available passport in service with updated profile.id', () => {
      // GIVEN
      comp.profile = { id: 123 };
      const passport: IPassport = { id: 456 };
      jest.spyOn(passportService, 'query').mockReturnValue(of(new HttpResponse({ body: [passport] })));

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(passportService.query).toHaveBeenCalled();
      expect(passportService.query).toHaveBeenCalledWith({ 'profileId.in': 123 });
      expect(comp.passportForm.value).toEqual(expect.objectContaining(passport));
    });
    it('Should query unavailable passport in service with updated profile.id', () => {
      // GIVEN
      comp.profile = { id: 123 };
      jest.spyOn(passportService, 'query').mockReturnValue(of(new HttpResponse({ body: [] })));

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(passportService.query).toHaveBeenCalled();
      expect(passportService.query).toHaveBeenCalledWith({ 'profileId.in': 123 });
      expect(comp.passportForm.value).toEqual(expect.objectContaining({}));
    });
  });

  /* TODO: SEE IF REQUIRED or Get this part working
    describe('ngOnInit', () => {

        it('Should call profile query and add missing value', () => {
                const passport : IPassport = {"id":456};
                const profile : IProfile = {"id":15799};
                passport.profile = profile;

                const profileCollection: IProfile[] = [{"id":58135}];
                jest.spyOn(profileService, 'query').mockReturnValue(of(new HttpResponse({ body: profileCollection })));
                const expectedCollection: IProfile[] = [profile, ...profileCollection];
                jest.spyOn(profileService, 'addProfileToCollectionIfMissing').mockReturnValue(expectedCollection);

                activatedRoute.data = of({ passport });
                comp.ngOnInit();

                expect(profileService.query).toHaveBeenCalled();
                expect(profileService.addProfileToCollectionIfMissing).toHaveBeenCalledWith(profileCollection, profile);
                expect(comp.profilesCollection).toEqual(expectedCollection);
        });

        it('Should update editForm', () => {
            const passport: IPassport = {"id":456};
            const profile: IProfile = {"id":6577};
            passport.profile = profile;

            activatedRoute.data = of({ passport });
            comp.ngOnInit();

            expect(comp.passportForm.value).toEqual(expect.objectContaining(passport));
            expect(comp.profilesCollection).toContain(profile);
        });
    });
*/
  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Passport>>();
      const passport = { id: 123 };

      comp.passportForm.patchValue(passport);
      jest.spyOn(passportService, 'update').mockReturnValue(saveSubject);

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: passport }));
      saveSubject.complete();

      // THEN
      expect(passportService.update).toHaveBeenCalledWith(expect.objectContaining(passport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Passport>>();
      const passport = new Passport();

      comp.passportForm.patchValue(passport);
      jest.spyOn(passportService, 'create').mockReturnValue(saveSubject);

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: passport }));
      saveSubject.complete();

      // THEN
      expect(passportService.create).toHaveBeenCalledWith(expect.objectContaining(passport));
      expect(comp.isSaving).toEqual(false);
    });
    /* TODO: take care of this part
        it('Should set isSaving to false on error', () => {
            // GIVEN
            const saveSubject = new Subject<HttpResponse<Passport>>();
            const passport = {"id":123};
            jest.spyOn(passportService, 'update').mockReturnValue(saveSubject);
            jest.spyOn(comp, 'previousState');
            activatedRoute.data = of({ passport });
            comp.ngOnInit();

            // WHEN
            comp.save();
            expect(comp.isSaving).toEqual(true);
            saveSubject.error('This is an error!');

            // THEN
            expect(passportService.update).toHaveBeenCalledWith(passport);
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
