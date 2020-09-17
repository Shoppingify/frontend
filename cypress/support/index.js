// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('input[name="email"]').type('admin@test.fr')
    cy.get('input[name="password"]').type('password')

    cy.server()
    cy.fixture('loginResponse.json')
        .as('loginResponse')
        .then((json) => {
            window.localStorage.setItem('token', json.data.token)
        })
    cy.route('POST', '/api/login', '@loginResponse')

    cy.get('form').submit()
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
