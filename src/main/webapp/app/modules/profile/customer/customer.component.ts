import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICustomer, Customer } from '../model/customer.model';
import { CustomerService } from './customer.service';
import { IProfile, Profile } from '../model/profile.model';
import { ProfileService } from '../profile.service';
import { GENDER } from 'app/modules/profile/enumerations/gender.model';
import { FuseAlertType } from '@fuse/components/alert';
@Component({
  selector: 'jhi-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input() profile: Profile;
  isSaving = false;
  gENDERValues = Object.keys(GENDER);

  profilesCollection: IProfile[] = [];

  customerForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    middleName: [],
    lastName: [null, [Validators.required]],
    dob: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    profile: []
  });
  alert: { type: FuseAlertType; message: string } = {
    type: 'primary',
    message: 'Customer Saved/Updated successfully !!!'
  };
  showAlert$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newCustomer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    protected customerService: CustomerService,
    protected profileService: ProfileService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    // TODO: brmaStr template to make this more dynamic instead of using harcoded relationship entities
    this.customerService.query({ 'profileId.in': this.profile.id }).subscribe(response => {
      if (response.body) {
        this.updateForm(response.body[0] ? response.body[0] : {});
        this.newCustomer.next(false);
      } else {
        this.updateForm({ profile: this.profile });
        this.newCustomer.next(true);
      }
    });
  }

  save(): void {
    this.showAlert$.next(false);
    this.isSaving = true;
    const customer = this.createFromForm();
    customer.profile = this.profile;
    if (customer.id) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError()
    });
  }

  protected onSaveSuccess(): void {
    this.showAlert$.next(true);
    this.newCustomer.next(false);
    // this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
  protected updateForm(customer: ICustomer): void {
    this.customerForm.patchValue({
      id: customer.id,
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      dob: customer.dob ? customer.dob.toDate() : undefined,
      gender: customer.gender,
      profile: customer.profile
    });

    this.profilesCollection = this.profileService.addProfileToCollectionIfMissing(this.profilesCollection, customer.profile);
  }

  protected createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.customerForm.get(['id'])!.value,
      firstName: this.customerForm.get(['firstName'])!.value,
      middleName: this.customerForm.get(['middleName'])!.value,
      lastName: this.customerForm.get(['lastName'])!.value,
      dob: this.customerForm.get(['dob'])!.value,
      gender: this.customerForm.get(['gender'])!.value,
      profile: this.customerForm.get(['profile'])!.value
    };
  }
}
