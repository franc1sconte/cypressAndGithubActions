/// <reference types="cypress" />

describe('example', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })


  it('prueba login cuenta numero 2', () => {

    const authState = {
      state: {
        user: {
          id: Cypress.env('USER_ID_2'),
          name: Cypress.env('USER_NAME_2'),
          email: Cypress.env('USER_EMAIL_2'),
          avatar: Cypress.env('USER_AVATAR_2'),
          wasOnboarded: Cypress.env('WAS_ON_BOARDED')
        },
        token: Cypress.env('USER_TOKEN_2'),
        isAuthenticated: Cypress.env('IS_AUTHENTICATED')
      },
      version: 0
    };

    // Inyectar el auth en localStorage antes de que la app cargue
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('auth', JSON.stringify(authState));
      }
    })

    cy.log('Auth hardcodeado inyectado:', authState);
    cy.url().should('include', '/dashboard')
    cy.screenshot('dashboard-authenticated-2')

  })

  it('prueba login cuenta numero 1', () => {

    const authState = {
      state: {
        user: {
          id: Cypress.env('USER_ID_1'),
          name: Cypress.env('USER_NAME_1'),
          email: Cypress.env('USER_EMAIL_1'),
          avatar: Cypress.env('USER_AVATAR_1'),
          wasOnboarded: Cypress.env('WAS_ON_BOARDED')
        },
        token: Cypress.env('USER_TOKEN_1'),
        isAuthenticated: Cypress.env('IS_AUTHENTICATED')
      },
      version: 0
    };

    // Inyectar el auth en localStorage antes de que la app cargue
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('auth', JSON.stringify(authState));
      }
    })

    cy.log('Auth hardcodeado inyectado:', authState);
    cy.url().should('include', '/dashboard')
    cy.screenshot('dashboard-authenticated-1')

  })

})
