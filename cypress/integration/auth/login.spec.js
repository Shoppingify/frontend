describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
    })

    it('should show the login page', () => {
        cy.get('button').contains('Login')
    })

    it('should log a user', () => {
        cy.get('input[name="email"]').type('admin@test.fr')
        cy.get('input[name="password"]').type('password')

        cy.server()
        cy.fixture('loginResponse.json').as('loginResponse')
        cy.route('POST', '/api/login', '@loginResponse')

        cy.get('form').submit()

        cy.url().should('include', '/items')
    })

    it('should show invalid data errors', () => {
        cy.get('input[name="email"]').type('admin')
        cy.get('input[name="password"]').type('pass')

        cy.get('form').submit()

        cy.contains('email must be a valid email')
        cy.contains('password must be at least 6 characters')
    })

    it('should go to the register page', () => {
        cy.get('a').contains('Register').click()
        cy.url().should('include', 'register')
    })

    //TODO
    // it('should not authorize to click on login button if no data is provided', () => {
    //     cy.get('input[name="email"]')
    //     cy.get('input[name="password"]')

    //     cy.get('button').contains('Login').should('be.disabled')
    // })
})
