// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  chat: {
    // vertical
    classic: true,
    classy: true,
    compact: true,
    dense: true,
    futuristic: true,
    thin: true,

    // horizontal
    centered: true,
    enterprise: true,
    modern: true,
    material: true
  },
  isAvailableSetting: true,
  // This config is only required when choosing to have mockAPI for the server side

  mockApiConfig: {
    enableMockAPI: true,
    disableMockApiFor: [],
    mockAccountUser: 'admin'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
