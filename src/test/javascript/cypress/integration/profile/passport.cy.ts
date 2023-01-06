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
  userProfileBtn,
  manyToOneRelAddButton
} from '../../support/commands';

describe('Profile -> Passport Workflow', () => {
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
      cy.get(userIcon).click();
      cy.get(userProfileBtn).click();
      cy.get(profileDrawerContentToggleBtn).click();
      cy.get(profileHeader).should('be.visible');
    });

    it('Should contain Passport contents', () => {
      cy.get('[data-cy="btn-passport"]').click();
      // cy.get('[data-cy="passport-selector"]');
      // cy.get('[data-cy="firstName"]').type('AAA');
    });
  });

  describe('for user Passport creation workflow', () => {
    beforeEach(() => {
      cy.visit('/#/home');
      cy.get(homePageSignin).click();

      cy.get(signinpageLoginField).type('user');
      cy.get(signinpagePasswordField).type('user');
      cy.get(signinpageSubmitButton).click();

      // Default enterprise layout
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(waitTime);
      cy.get(userIcon).click();
      cy.get(userProfileBtn).click();
      cy.get(profileDrawerContentToggleBtn).click();
      cy.get(profileHeader).should('be.visible');
    });

    it('first time login and creation of Passport', () => {
      cy.get('[data-cy="btn-passport"]').click();
      // cy.get('[data-cy="passport-selector"]');

      cy.get(`[data-cy="identity"]`).type('{selectall}{backspace}').type('Soap orange').should('have.value', 'Soap orange');

      cy.get(`[data-cy="expiry"]`).type('{selectall}{backspace}').type('2022-12-05').should('have.value', '2022-12-05');

      cy.get(`[data-cy="issuingCountry"]`)
        .type('{selectall}{backspace}')
        .type('Mouse Marshall Optimization')
        .should('have.value', 'Mouse Marshall Optimization');

      cy.get(`[data-cy="documentNumber"]`).type('{selectall}{backspace}').type('red Awesome').should('have.value', 'red Awesome');

      cy.get(`mat-select[data-cy=passportType]`).click().get('mat-option').contains('DIPLOMATIC').click();

      cy.get('[data-cy="save"]').click();
      /*
          cy.wait('@postEntityRequest').then(({ response }) => {
            expect(response!.statusCode).to.equal(201);
            passport = response!.body;
          });
          cy.wait('@entitiesRequest').then(({ response }) => {
            expect(response!.statusCode).to.equal(200);
          });
          cy.url().should('match', passportPageUrlPattern);
          */
    });
  });
});
