import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPaymentInfo, PaymentInfo } from '../model/payment-info.model';
import { PaymentInfoService } from './payment-info.service';
import { IProfile, Profile } from '../model/profile.model';
import { ProfileService } from '../profile.service';
import { PAYMENTTYPE } from 'app/modules/profile/enumerations/paymenttype.model';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationConfig } from '@fuse/services/confirmation';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
@Component({
  selector: 'jhi-payment-info',
  templateUrl: './payment-info.component.html'
})
export class PaymentInfoComponent implements OnInit, OnChanges {
  @Input() profile: Profile;
  isSaving = false;
  pAYMENTTYPEValues = Object.keys(PAYMENTTYPE);

  profilesSharedCollection: IProfile[] = [];

  paymentinfoForms: FormArray = new FormArray([]);
  alert: { type: FuseAlertType; message: string } = {
    type: 'primary',
    message: 'PaymentInfo Saved/Updated successfully !!!'
  };
  showAlert$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newCustomer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    protected paymentInfoService: PaymentInfoService,
    protected profileService: ProfileService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected dialog: MatDialog,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    // TODO: brmaStr template to make this more dynamic instead of using harcoded relationship entities
    this.paymentInfoService.query({ 'profileId.in': this.profile.id }).subscribe(response => {
      if (response.body) {
        this.updateForm(response.body);
        this.newCustomer.next(false);
      } else {
        this.newCustomer.next(true);
      }
    });
  }
  addNew(): void {
    const paymentinfoForm = this.fb.group({
      id: [],
      paymentType: [null, [Validators.required]],
      pNumber: [null, [Validators.required]],
      expiry: [],
      security: [],
      profile: []
    });
    this.paymentinfoForms.push(paymentinfoForm);
  }

  remove(form: AbstractControl, index: number): void {
    const confirmConfig: FuseConfirmationConfig = {
      title: 'Warning !',
      message: 'This change is irreversible. Are you sure you want to delete this payment?',
      icon: {
        show: true,
        name: 'warning',
        color: 'primary'
      },
      actions: {
        confirm: {
          show: true,
          label: 'Delete',
          color: 'warn'
        },
        cancel: {
          show: true,
          label: 'Cancel'
        }
      },
      dismissible: false
    };
    this.dialog
      .open(FuseConfirmationDialogComponent, { data: confirmConfig, disableClose: true })
      .afterClosed()
      .subscribe({
        next: (resp: string) => {
          if (resp === 'confirmed') {
            if (form.get('id')?.value) {
              // Only delete a managed entity
              this.paymentInfoService.delete(form.get('id').value).subscribe();
            }
            this.paymentinfoForms.removeAt(index);
            this.changeDetectorRef.detectChanges();
          }
        }
      });
  }

  save(index: number): void {
    this.showAlert$.next(false);
    this.isSaving = true;
    const paymentInfo = this.createFromForm(index);
    paymentInfo.profile = this.profile;
    if (paymentInfo.id) {
      this.subscribeToSaveResponse(this.paymentInfoService.update(paymentInfo));
    } else {
      this.subscribeToSaveResponse(this.paymentInfoService.create(paymentInfo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentInfo>>): void {
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
  protected updateForm(paymentInfos: IPaymentInfo[]): void {
    paymentInfos.forEach(eachObj => this.paymentinfoForms.push(this.fb.group(eachObj)));
  }

  protected createFromForm(index: number): IPaymentInfo {
    return {
      ...new PaymentInfo(),
      ...this.paymentinfoForms.at(index).value
    };
  }
}
