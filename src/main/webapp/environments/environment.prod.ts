export const environment = {
  production: true,
  chat: {
    // vertical
    classic: false,
    classy: false,
    compact: false,
    dense: false,
    futuristic: false,
    thin: false,

    // horizontal
    centered: false,
    enterprise: false,
    modern: false,
    material: false
  },
  isAvailableSetting: false,
  // This config is only required when choosing to have mockAPI for the server side
  mockApiConfig: {
    enableMockAPI: true,
    disableMockApiFor: ['AccountMockAPI', 'JhiAuthMockApi', 'AccountAdminMockApi', 'ProfileMockApi', 'NavigationMockApi'],
    mockAccountUser: 'admin'
  }
};
