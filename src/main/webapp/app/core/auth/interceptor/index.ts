import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from 'app/core/auth/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from 'app/core/auth/interceptor/auth-expired.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true
  }
];
