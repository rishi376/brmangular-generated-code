import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

import { CustomerService } from './customer.service';
import { ICustomer, Customer } from '../model/customer.model';
import { IProfile } from '../model/profile.model';
import { ProfileService } from '../profile.service';

import { CustomerComponent } from './customer.component';

describe('Customer Management Update Component', () => {
  let comp: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let activatedRoute: ActivatedRoute;
  let customerService: CustomerService;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      declarations: [CustomerComponent],
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
      .overrideTemplate(CustomerComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerService = TestBed.inject(CustomerService);
    profileService = TestBed.inject(ProfileService);

    comp = fixture.componentInstance;
  });

  describe('ngOnChanges', () => {
    it('Should query available customer in service with updated profile.id', () => {
      // GIVEN
      comp.profile = { id: 123 };
      const customer: ICustomer = { id: 456 };
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: [customer] })));

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.query).toHaveBeenCalledWith({ 'profileId.in': 123 });
      expect(comp.customerForm.value).toEqual(expect.objectContaining(customer));
    });
    it('Should query unavailable customer in service with updated profile.id', () => {
      // GIVEN
      comp.profile = { id: 123 };
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: [] })));

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.query).toHaveBeenCalledWith({ 'profileId.in': 123 });
      expect(comp.customerForm.value).toEqual(expect.objectContaining({}));
    });
  });

  /* TODO: SEE IF REQUIRED or Get this part working
    describe('ngOnInit', () => {

        it('Should call profile query and add missing value', () => {
                const customer : ICustomer = {"id":456};
                const profile : IProfile = {"id":32225};
                customer.profile = profile;

                const profileCollection: IProfile[] = [{"id":52885}];
                jest.spyOn(profileService, 'query').mockReturnValue(of(new HttpResponse({ body: profileCollection })));
                const expectedCollection: IProfile[] = [profile, ...profileCollection];
                jest.spyOn(profileService, 'addProfileToCollectionIfMissing').mockReturnValue(expectedCollection);

                activatedRoute.data = of({ customer });
                comp.ngOnInit();

                expect(profileService.query).toHaveBeenCalled();
                expect(profileService.addProfileToCollectionIfMissing).toHaveBeenCalledWith(profileCollection, profile);
                expect(comp.profilesCollection).toEqual(expectedCollection);
        });

        it('Should update editForm', () => {
            const customer: ICustomer = {"id":456};
            const profile: IProfile = {"id":56007};
            customer.profile = profile;

            activatedRoute.data = of({ customer });
            comp.ngOnInit();

            expect(comp.customerForm.value).toEqual(expect.objectContaining(customer));
            expect(comp.profilesCollection).toContain(profile);
        });
    });
*/
  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Customer>>();
      const customer = { id: 123 };

      comp.customerForm.patchValue(customer);
      jest.spyOn(customerService, 'update').mockReturnValue(saveSubject);

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customer }));
      saveSubject.complete();

      // THEN
      expect(customerService.update).toHaveBeenCalledWith(expect.objectContaining(customer));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Customer>>();
      const customer = new Customer();

      comp.customerForm.patchValue(customer);
      jest.spyOn(customerService, 'create').mockReturnValue(saveSubject);

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customer }));
      saveSubject.complete();

      // THEN
      expect(customerService.create).toHaveBeenCalledWith(expect.objectContaining(customer));
      expect(comp.isSaving).toEqual(false);
    });
    /* TODO: take care of this part
        it('Should set isSaving to false on error', () => {
            // GIVEN
            const saveSubject = new Subject<HttpResponse<Customer>>();
            const customer = {"id":123};
            jest.spyOn(customerService, 'update').mockReturnValue(saveSubject);
            jest.spyOn(comp, 'previousState');
            activatedRoute.data = of({ customer });
            comp.ngOnInit();

            // WHEN
            comp.save();
            expect(comp.isSaving).toEqual(true);
            saveSubject.error('This is an error!');

            // THEN
            expect(customerService.update).toHaveBeenCalledWith(customer);
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
