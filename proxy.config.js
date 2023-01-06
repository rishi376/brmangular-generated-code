const PROXY_CONFIG = [
  {
    context: [
      '/api',
      '/api/signup',
      '/api/applications',
      '/api/application-instances',
      '/api/register',
      '/api/account',
      '/api/authenticate',
      '/services/',
      '/auth'
    ],
    target: 'http://localhost:8080',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
