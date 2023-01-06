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

describe('Profile -> PaymentInfo Workflow', () => {
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

    it('Should contain PaymentInfo contents', () => {
      cy.get('[data-cy="btn-payment-info"]').click();
      // cy.get('[data-cy="paymentInfo-selector"]');
      // cy.get('[data-cy="firstName"]').type('AAA');
    });
  });

  describe('for user PaymentInfo creation workflow', () => {
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

    it('first time login and creation of PaymentInfo', () => {
      cy.get('[data-cy="btn-payment-info"]').click();
      cy.get(manyToOneRelAddButton).click();
      cy.get('[data-cy="accordian-data-1"]').click();
      // cy.get('[data-cy="paymentInfo-selector"]');

      cy.get(`mat-select[data-cy=paymentType-1]`).click().get('mat-option').contains('CREDIT').click();

      cy.get(`[data-cy="pNumber-1"]`).type('{selectall}{backspace}').type('41782').should('have.value', '41782');

      cy.get(`[data-cy="expiry-1"]`).type('{selectall}{backspace}').type('2022-12-05').should('have.value', '2022-12-05');

      cy.get(`[data-cy="security-1"]`).type('{selectall}{backspace}').type('22561').should('have.value', '22561');

      cy.get('[data-cy="save-1"]').click();
      /*
          cy.wait('@postEntityRequest').then(({ response }) => {
            expect(response!.statusCode).to.equal(201);
            paymentInfo = response!.body;
          });
          cy.wait('@entitiesRequest').then(({ response }) => {
            expect(response!.statusCode).to.equal(200);
          });
          cy.url().should('match', paymentInfoPageUrlPattern);
          */
    });
  });
});
