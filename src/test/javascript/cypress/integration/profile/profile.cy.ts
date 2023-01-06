import {
  classyHeader,
  enterpriseHeader,
  homePageSignin,
  profileDrawerContentToggleBtn,
  profileHeader,
  signinpageLoginField,
  signinpagePasswordField,
  signinpageSubmitButton,
  userIcon,
  userProfileBtn
} from '../../support/commands';

describe('Auth Workflow', () => {
  const waitTime = 2000;
  beforeEach(() => {
    cy.intercept('GET', '/assets/**').as('authenticate');
  });
  describe('for Admin', () => {
    beforeEach(() => {
      cy.visit('/#/home');
      cy.get(homePageSignin).click();

      cy.get(signinpageLoginField).type('admin');
      cy.get(signinpagePasswordField).type('admin');
      cy.get(signinpageSubmitButton).click();

      // Default enterprise layout
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(waitTime);
    });

    it('Should contain Profile contents', () => {
      cy.get(userIcon).click();
      cy.get(userProfileBtn).click();
      cy.get(profileDrawerContentToggleBtn).click();
      cy.get(profileHeader).should('be.visible');
    });
  });
  describe('for regular User', () => {
    beforeEach(() => {
      cy.visit('/#/home');
      cy.get(homePageSignin).click();
      cy.get(signinpageLoginField).type('user');
      cy.get(signinpagePasswordField).type('user');
      cy.get(signinpageSubmitButton).click();

      // Default enterprise layout
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(waitTime);
    });
    it('Should contain Profile contents', () => {
      cy.get(userIcon).click();
      cy.get(userProfileBtn).click();
      cy.get(profileDrawerContentToggleBtn).click();
      cy.get(profileHeader).should('be.visible');
    });
  });
  describe('for regular back office user', () => {
    beforeEach(() => {
      cy.visit('/#/home');
      cy.get(homePageSignin).click();
      cy.get(signinpageLoginField).type('csUser');
      cy.get(signinpagePasswordField).type('csUser');
      cy.get(signinpageSubmitButton).click();

      // Default enterprise layout
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(waitTime);
    });
    it('Should contain Profile contents', () => {
      cy.get(userIcon).click();
      cy.get(userProfileBtn).click();
      cy.get(profileDrawerContentToggleBtn).click();
      cy.get(profileHeader).should('be.visible');
    });
  });
});
