import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { settingsRoutes } from './profile.routing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { CustomerComponent } from './customer/customer.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { PassportComponent } from './passport/passport.component';
/* brm-needle-add-profile-section-import - brm-generator will add profile section import here */

@NgModule({
  declarations: [
    ProfileComponent,
    CustomerComponent,
    PaymentInfoComponent,
    PassportComponent
    /* brm-needle-add-profile-section-declarations - brm-generator will add profile section declarations here */
  ],
  imports: [
    RouterModule.forChild(settingsRoutes),
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FuseAlertModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    SharedModule,
    FontAwesomeModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    FuseConfirmationModule
  ],
  providers: [
    {
      /* TODO: Changing this format will require change in the fake data creation for cypress tests */
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD'
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    }
  ]
})
export class ProfileModule {}
