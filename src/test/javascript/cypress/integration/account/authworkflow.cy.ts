import {
  classyHeader,
  enterpriseHeader,
  enterpriseLayoyt,
  homepageDiv,
  homePageSignin,
  signinpageAlert,
  signinpageForm,
  signinpageLoginField,
  signinpagePassReq,
  signinpagePasswordField,
  signinpageRembermeField,
  signinpageSubmitButton,
  signinpageUserReq
} from '../../support/commands';

describe('Auth Workflow', () => {
  const waitTime = 2000;
  beforeEach(() => {
    cy.visit('/#/home');
  });

  beforeEach(() => {
    cy.intercept('GET', '/assets/**').as('authenticate');
  });

  it('Default URL should navigate to home page', () => {
    cy.url().should('include', '/home');
    cy.get(homepageDiv);
    cy.get(homePageSignin);
  });
  it('Home Page Signin link should navigate to sign-in page with default values', () => {
    cy.get(homePageSignin).click();

    // TODO - Need to find a way to intercept routers
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.url().should('include', '/sign-in');
    cy.get(signinpageForm);
    cy.get(signinpageLoginField).should('have.value', '');
    cy.get(signinpagePasswordField).should('have.value', '');
    cy.get(signinpageRembermeField).should('not.be.checked');
  });
  it('Sign-in page should not submit with empty user & pass ', () => {
    cy.get(homePageSignin).click();

    cy.get(signinpageSubmitButton).click();
    cy.get(signinpageUserReq).should('be.visible');
    cy.get(signinpagePassReq).should('be.visible');
  });
  it('Sign-in page should not submit with empty user', () => {
    cy.get(homePageSignin).click();

    cy.get(signinpagePasswordField).type('user');
    cy.get(signinpageSubmitButton).click();
    cy.get(signinpageUserReq).should('be.visible');
  });
  it('Sign-in page should not submit with empty pass', () => {
    cy.get(homePageSignin).click();

    cy.get(signinpageLoginField).type('pass');
    cy.get(signinpageSubmitButton).click();
    cy.get(signinpagePassReq).should('be.visible');
  });
  it('Sign-in fails with wrong user or pass', () => {
    cy.get(homePageSignin).click();

    cy.get(signinpageAlert).should('not.exist');
    cy.get(signinpageLoginField).type('ddd');
    cy.get(signinpagePasswordField).type('ddd');
    cy.get(signinpageSubmitButton).click();
    cy.get(signinpageAlert).should('be.visible');
  });
  it('Successful sign-in with admin credentials', () => {
    cy.get(homePageSignin).click();

    cy.get(signinpageAlert).should('not.exist');
    cy.get(signinpageLoginField).type('admin');
    cy.get(signinpagePasswordField).type('admin');
    cy.get(signinpageSubmitButton).click();

    // Default enterprise layout
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(waitTime);
  });
  it('Successful sign-in with user credentials', () => {
    cy.get(homePageSignin).click();

    cy.get(signinpageAlert).should('not.exist');
    cy.get(signinpageLoginField).type('user');
    cy.get(signinpagePasswordField).type('user');
    cy.get(signinpageSubmitButton).click();

    // Default enterprise layout
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(waitTime);
  });
  it('Successful sign-in with back office credentials', () => {
    cy.get(homePageSignin).click();

    cy.get(signinpageAlert).should('not.exist');
    cy.get(signinpageLoginField).type('csUser');
    cy.get(signinpagePasswordField).type('csUser');
    cy.get(signinpageSubmitButton).click();

    // Default enterprise layout
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(waitTime);
  });
});
