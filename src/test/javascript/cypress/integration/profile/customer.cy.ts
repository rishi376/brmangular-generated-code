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

describe('Profile -> Customer Workflow', () => {
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

    it('Should contain Customer contents', () => {
      cy.get('[data-cy="btn-customer"]').click();
      // cy.get('[data-cy="customer-selector"]');
      // cy.get('[data-cy="firstName"]').type('AAA');
    });
  });

  describe('for user Customer creation workflow', () => {
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

    it('first time login and creation of Customer', () => {
      cy.get('[data-cy="btn-customer"]').click();
      // cy.get('[data-cy="customer-selector"]');

      cy.get(`[data-cy="firstName"]`).type('{selectall}{backspace}').type('Diego').should('have.value', 'Diego');

      cy.get(`[data-cy="middleName"]`)
        .type('{selectall}{backspace}')
        .type('capacitor Territory Computers')
        .should('have.value', 'capacitor Territory Computers');

      cy.get(`[data-cy="lastName"]`).type('{selectall}{backspace}').type('Gaylord').should('have.value', 'Gaylord');

      cy.get(`[data-cy="dob"]`).type('{selectall}{backspace}').type('2022-12-05').should('have.value', '2022-12-05');

      cy.get(`mat-select[data-cy=gender]`).click().get('mat-option').contains('MALE').click();

      cy.get('[data-cy="save"]').click();
      /*
          cy.wait('@postEntityRequest').then(({ response }) => {
            expect(response!.statusCode).to.equal(201);
            customer = response!.body;
          });
          cy.wait('@entitiesRequest').then(({ response }) => {
            expect(response!.statusCode).to.equal(200);
          });
          cy.url().should('match', customerPageUrlPattern);
          */
    });
  });
});
