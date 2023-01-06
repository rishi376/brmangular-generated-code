/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
// ***********************************************
// This commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// ***********************************************
// Begin Specific Selector Attributes for Cypress
// ***********************************************

//User
export const userIcon = '[data-cy="userIcon"]';
// Home Page
export const homepageDiv = '[data-cy="home-cy10000"]';
export const homePageSignin = '[data-cy="home-cy10001"]';
// Sign-in Page
export const signinpageForm = '[data-cy="signForm-cy1897"]';
export const signinpageSubmitButton = '[data-cy="sign-cy1788"]';
export const signinpageLoginField = '[data-cy="signinpage-10002"]';
export const signinpagePasswordField = '[data-cy="signinpage-10003"]';
export const signinpageRembermeField = '[data-cy="signinpage-10004"]';
export const signinpageUserReq = '[data-cy="signinpage-passreq-10005"]';
export const signinpagePassReq = '[data-cy="signinpage-passreq-10006"]';
export const signinpageAlert = '[data-cy="signinpage-alert-10007"]';
// Enterprise Layout
export const enterpriseHeader = '[data-cy="ent-layout-10001"]';
export const enterpriseLayoyt = '[data-cy="layout-enterprise-cy10000"]';

// Classy Layout
export const classyHeader = '[data-cy="clsy-layout-10000"]';

// Navbar
export const navbarSelector = '[data-cy="navbar"]';
export const adminMenuSelector = '[data-cy="adminMenu"]';
export const accountMenuSelector = '[data-cy="accountMenu"]';
export const registerItemSelector = '[data-cy="register"]';
export const settingsItemSelector = '[data-cy="settings"]';
export const passwordItemSelector = '[data-cy="passwordItem"]';
export const loginItemSelector = '[data-cy="login"]';
export const logoutItemSelector = '[data-cy="logout"]';
export const entityItemSelector = '[data-cy="entity"]';

// Entity-Common
export const manyToOneRelAddButton = '[data-cy="add-new-entity"]';

// Profile
export const userProfileBtn = '[data-cy="user-profile-cy10000"]';
export const profileDrawerDiv = '[data-cy="profile-cy10000"]';
export const profileDrawer = '[data-cy="profile-cy10001"]';
export const profileDrawerContent = '[data-cy="profile-cy10002"]';
export const profileDrawerContentToggleBtn = '[data-cy="profile-cy10003"]';
export const profileHeader = '[data-cy="profile-cy10004"]';

// Login
export const titleLoginSelector = '[data-cy="loginTitle"]';
export const errorLoginSelector = '[data-cy="loginError"]';
export const usernameLoginSelector = '[data-cy="username"]';
export const passwordLoginSelector = '[data-cy="password"]';
export const forgetYourPasswordSelector = '[data-cy="forgetYourPasswordSelector"]';
export const submitLoginSelector = '[data-cy="submit"]';
// Register
export const titleRegisterSelector = '[data-cy="registerTitle"]';
export const usernameRegisterSelector = '[data-cy="username"]';
export const emailRegisterSelector = '[data-cy="email"]';
export const firstPasswordRegisterSelector = '[data-cy="firstPassword"]';
export const secondPasswordRegisterSelector = '[data-cy="secondPassword"]';
export const submitRegisterSelector = '[data-cy="submit"]';
// Settings
export const firstNameSettingsSelector = '[data-cy="firstname"]';
export const lastNameSettingsSelector = '[data-cy="lastname"]';
export const emailSettingsSelector = '[data-cy="email"]';
export const languageSettingsSelector = '[data-cy="langKey"]';
export const submitSettingsSelector = '[data-cy="submit"]';
// Password
export const currentPasswordSelector = '[data-cy="currentPassword"]';
export const newPasswordSelector = '[data-cy="newPassword"]';
export const confirmPasswordSelector = '[data-cy="confirmPassword"]';
export const submitPasswordSelector = '[data-cy="submit"]';
// Reset Password
export const emailResetPasswordSelector = '[data-cy="emailResetPassword"]';
export const submitInitResetPasswordSelector = '[data-cy="submit"]';
// Administration
export const userManagementPageHeadingSelector = '[data-cy="userManagementPageHeading"]';
export const swaggerFrameSelector = 'iframe[data-cy="swagger-frame"]';
export const swaggerPageSelector = '[id="swagger-ui"]';
export const metricsPageHeadingSelector = '[data-cy="metricsPageHeading"]';
export const healthPageHeadingSelector = '[data-cy="healthPageHeading"]';
export const logsPageHeadingSelector = '[data-cy="logsPageHeading"]';
export const configurationPageHeadingSelector = '[data-cy="configurationPageHeading"]';
// ***********************************************
// End Specific Selector Attributes for Cypress
// ***********************************************
export const classInvalid = 'ng-invalid';
export const classValid = 'ng-valid';
Cypress.Commands.add('authenticatedRequest', (data: any) => {
  const bearerToken = JSON.parse(sessionStorage.getItem(Cypress.env('jwtStorageName')));
  return cy.request({
    ...data,
    auth: {
      bearer: bearerToken
    }
  });
});
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: 'GET',
        url: '/api/account',
        failOnStatusCode: false
      });
      cy.authenticatedRequest({
        method: 'POST',
        body: { username, password },
        url: Cypress.env('authenticationUrl')
      }).then(({ body: { id_token } }) => {
        sessionStorage.setItem(Cypress.env('jwtStorageName'), JSON.stringify(id_token));
      });
    },
    {
      validate() {
        cy.authenticatedRequest({ url: '/api/account' }).its('status').should('eq', 200);
      }
    }
  );
});
declare global {
  namespace Cypress {
    interface Chainable {
      authenticatedRequest(data: any): Cypress.Chainable;
      login(username: string, password: string): Cypress.Chainable;
    }
  }
}
import 'cypress-audit/commands';
// Convert this to a module instead of script (allows import/export)
export {};
