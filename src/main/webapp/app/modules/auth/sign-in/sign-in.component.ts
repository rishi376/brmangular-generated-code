import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { Authority } from 'app/config/authority.constants';
import { Account } from 'app/core/auth/account.model';
import { AuthService } from 'app/core/auth/auth.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LoginService } from './login.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  signInForm: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private http: HttpClient,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  login(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;
    this.loginService
      .login({
        username: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value,
        rememberMe: this.signInForm.get('rememberMe')?.value
      })
      .subscribe({
        next: (val: Account) => {
          if (val.authorities.includes(Authority.admin)) {
            this._router.navigate(['/admin/dashboard']);
          } else if (val.authorities.includes(Authority.backOfficeUser)) {
            this._router.navigate(['/customer-service/dashboard']);
          } else {
            this._router.navigate(['/regular-user/dashboard']); // Default user
          }
        },
        error: () => {
          // Re-enable the form
          this.signInForm.enable();

          // Reset the form
          this.signInNgForm.resetForm();

          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Wrong email or password'
          };

          // Show the alert
          this.showAlert = true;
          // TODO - See if this is required
          // this.authenticationError = true
        }
      });
  }
}
