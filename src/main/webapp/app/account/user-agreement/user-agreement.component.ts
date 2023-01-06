import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserAgreementService } from './user-agreement.service';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss']
})
export class UserAgreementComponent implements OnInit {
  pdfSrc!: string;
  enableRenderText!: boolean;
  userAgreementForm!: UntypedFormGroup;

  constructor(private userAgreementService: UserAgreementService) {
    this.userAgreementService.getPdfLink('application2').subscribe({
      next: (res: string) => {
        this.pdfSrc = res;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.userAgreementForm = new UntypedFormGroup({
      agreeCheck: new UntypedFormControl(false, [Validators.required]),
      date: new UntypedFormControl({ value: '', disabled: true }, [Validators.required]),
      initials: new UntypedFormControl({ value: '', disabled: true }, [Validators.required])
    });
  }

  updateForm(value: boolean): void {
    console.log(value);
    if (value) {
      this.userAgreementForm.get('date')?.enable();
      this.userAgreementForm.get('initials')?.enable();
    } else {
      this.userAgreementForm.get('date')?.disable();
      this.userAgreementForm.get('initials')?.disable();
    }
  }

  submitForm(): void {
    console.log(this.userAgreementForm);
  }
}
