// import { Route } from '@angular/router';
// import { AuthGuard } from 'app/core/auth/guards/auth.guard';
// import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
// import { LayoutComponent } from 'app/layout/layout.component';
// import { InitialDataResolver } from 'app/app.resolvers';
// import { UserRouteAccessService } from './core/auth/user-route-access.service';
// import { Authority } from './config/authority.constants';

// // @formatter:off
// /* eslint-disable max-len */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// export const appRoutes: Route[] = [
//   // Account admin routes (registeration, activation, password reset & Settings)
//   {
//     path: 'account',
//     component: LayoutComponent,
//     data: {
//       layout: 'empty'
//     },
//     children: [{ path: '', loadChildren: () => import('../app/account/account.module').then(m => m.AccountModule) }]
//   },

//   // Redirect empty path to '/example'
//   { path: '', pathMatch: 'full', redirectTo: 'example' },

//   // Redirect signed in user to the '/example'
//   //
//   // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
//   // path. Below is another redirection for that path to redirect the user to the desired
//   // location. This is a small convenience to keep all main routes together here on this file.
//   { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

//   // Auth routes for guests
//   {
//     path: '',
//     component: LayoutComponent,
//     data: {
//       layout: 'empty'
//     },
//     children: [
//       {
//         path: 'forgot-password',
//         loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
//       },
//       {
//         path: 'reset-password',
//         loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
//       },
//       { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) }
//     ]
//   },

//   // Auth routes for authenticated users
//   {
//     path: '',
//     canActivate: [AuthGuard],
//     canActivateChild: [AuthGuard],
//     component: LayoutComponent,
//     data: {
//       layout: 'empty'
//     },
//     children: [
//       { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
//       {
//         path: 'unlock-session',
//         loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
//       }
//     ]
//   },

//   // Landing routes
//   {
//     path: '',
//     component: LayoutComponent,
//     data: {
//       layout: 'empty'
//     },
//     children: [{ path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) }]
//   },

//   // Admin routes
//   {
//     path: '',
//     data: {
//       authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_CS_USER']
//     },
//     canActivate: [UserRouteAccessService],
//     // canActivateChild: [AuthGuard],
//     component: LayoutComponent,
//     resolve: {
//       initialData: InitialDataResolver
//     },
//     children: [
//       { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
//       { path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule) }
//     ]
//   },
//   {
//     path: 'admin',
//     data: {
//       authorities: [Authority.admin]
//     },
//     component: LayoutComponent,
//     canActivate: [UserRouteAccessService],
//     resolve: {
//       initialData: InitialDataResolver
//     },
//     children: [
//       {
//         path: 'dashboard',
//         loadChildren: () => import('./modules/admin/example/example.module').then(m => m.ExampleModule)
//       }
//     ]
//   },
//   {
//     path: 'customer-service',
//     data: {
//       authorities: [Authority.backOfficeUser]
//     },
//     component: LayoutComponent,
//     resolve: {
//       initialData: InitialDataResolver
//     },
//     canActivate: [UserRouteAccessService],
//     children: [
//       {
//         path: 'dashboard',
//         loadChildren: () => import('./modules/customer-service/dashboard/dashboard.module').then(m => m.DashboardModule)
//       },
//       {
//         path: 'search',
//         loadChildren: () => import('./modules/customer-service/profile/search/search.module').then(m => m.ProfileSearchModule)
//       }
//     ]
//   },
//   {
//     path: 'regular-user',
//     data: {
//       authorities: [Authority.user]
//     },
//     component: LayoutComponent,
//     resolve: {
//       initialData: InitialDataResolver
//     },
//     canActivate: [UserRouteAccessService],
//     children: [
//       {
//         path: 'dashboard',
//         loadChildren: () => import('./modules/regular-user/regular-user.module').then(m => m.RegularUserModule)
//       }
//     ]
//   }
// ];



import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { UserRouteAccessService } from './core/auth/user-route-access.service';
import { Authority } from './config/authority.constants';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Account admin routes (registeration, activation, password reset & Settings)
  {
    path: 'account',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [{ path: '', loadChildren: () => import('../app/account/account.module').then(m => m.AccountModule) }]
  },

  // Redirect empty path to '/example'
  { path: '', pathMatch: 'full', redirectTo: 'example' },

  // Redirect signed in user to the '/example'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

  // Auth routes for guests
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {
        path: 'forgot-password',
        loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
      },
      { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) }
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
      {
        path: 'unlock-session',
        loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
      }
    ]
  },

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [{ path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) }]
  },

  // Admin routes
  {
    path: '',
    data: {
      authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_CS_USER']
    },
    canActivate: [UserRouteAccessService],
    // canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver
    },
    children: [
      { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
      { path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule) },
      { 
        path: 'admin',
        data: {
          authorities: [Authority.admin]
        },
        canActivate: [UserRouteAccessService],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./modules/admin/example/example.module').then(m => m.ExampleModule)
          }
        ]
      },
      {
        path: 'customer-service',
        data: {
          authorities: [Authority.backOfficeUser]
        },
        canActivate: [UserRouteAccessService],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./modules/customer-service/dashboard/dashboard.module').then(m => m.DashboardModule)
          },
          {
            path: 'search',
            loadChildren: () => import('./modules/customer-service/profile/search/search.module').then(m => m.ProfileSearchModule)
          }
        ]
      },
      {
        path: 'regular-user',
        data: {
          authorities: [Authority.user]
        },
        canActivate: [UserRouteAccessService],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./modules/regular-user/regular-user.module').then(m => m.RegularUserModule)
          }
        ]
      }
    ]
  },
];
