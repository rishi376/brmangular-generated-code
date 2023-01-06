import { Route } from '@angular/router';
import { AuthSignUpComponent } from './sign-up.component';

export const authSignupRoutes: Route = {
  path: 'signup',
  component: AuthSignUpComponent,
  data: {
    pageTitle: 'activate.title'
  }
};
