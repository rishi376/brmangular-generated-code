import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPassport, Passport } from '../model/passport.model';
import { PassportService } from './passport.service';
import { IProfile, Profile } from '../model/profile.model';
import { ProfileService } from '../profile.service';
import { PASSPORTTYPE } from 'app/modules/profile/enumerations/passporttype.model';
import { FuseAlertType } from '@fuse/components/alert';
@Component({
  selector: 'jhi-passport',
  templateUrl: './passport.component.html'
})
export class PassportComponent implements OnInit, OnChanges {
  @Input() profile: Profile;
  isSaving = false;
  pASSPORTTYPEValues = Object.keys(PASSPORTTYPE);

  profilesCollection: IProfile[] = [];

  passportForm = this.fb.group({
    id: [],
    identity: [null, [Validators.required]],
    expiry: [null, [Validators.required]],
    issuingCountry: [null, [Validators.required]],
    documentNumber: [],
    passportType: [null, [Validators.required]],
    profile: []
  });
  alert: { type: FuseAlertType; message: string } = {
    type: 'primary',
    message: 'Passport Saved/Updated successfully !!!'
  };
  showAlert$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newCustomer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    protected passportService: PassportService,
    protected profileService: ProfileService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    // TODO: brmaStr template to make this more dynamic instead of using harcoded relationship entities
    this.passportService.query({ 'profileId.in': this.profile.id }).subscribe(response => {
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
    const passport = this.createFromForm();
    passport.profile = this.profile;
    if (passport.id) {
      this.subscribeToSaveResponse(this.passportService.update(passport));
    } else {
      this.subscribeToSaveResponse(this.passportService.create(passport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPassport>>): void {
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
  protected updateForm(passport: IPassport): void {
    this.passportForm.patchValue({
      id: passport.id,
      identity: passport.identity,
      expiry: passport.expiry ? passport.expiry.toDate() : undefined,
      issuingCountry: passport.issuingCountry,
      documentNumber: passport.documentNumber,
      passportType: passport.passportType,
      profile: passport.profile
    });

    this.profilesCollection = this.profileService.addProfileToCollectionIfMissing(this.profilesCollection, passport.profile);
  }

  protected createFromForm(): IPassport {
    return {
      ...new Passport(),
      id: this.passportForm.get(['id'])!.value,
      identity: this.passportForm.get(['identity'])!.value,
      expiry: this.passportForm.get(['expiry'])!.value,
      issuingCountry: this.passportForm.get(['issuingCountry'])!.value,
      documentNumber: this.passportForm.get(['documentNumber'])!.value,
      passportType: this.passportForm.get(['passportType'])!.value,
      profile: this.passportForm.get(['profile'])!.value
    };
  }
}
