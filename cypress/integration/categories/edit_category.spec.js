let token

describe('Edit category', () => {
    before(() => {
        cy.fixture('loginResponse').then((json) => {
            token = json.data.token
        })
    })

    beforeEach(() => {
        cy.server()
        cy.fixture('meResponse.json').as('meResponse')
        cy.route('/api/me', '@meResponse').as('me')

        cy.visit('http://localhost:8080/', {
            onBeforeLoad: (win) => {
                win.localStorage.setItem('token', token)
            },
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })

        cy.server()
        cy.fixture('itemsResponse.json').as('itemsResponse')
        cy.route('/api/items', '@itemsResponse').as('apiItems')

        cy.route(
            '/api/lists?status=active',
            'fixture:activeListResponse.json'
        ).as('apiList')

        cy.route(
            `/api/lists/379/items`,
            'fixture:activeListItemsResponse.json'
        ).as('itemsList')

        cy.visit('http://localhost:8080/items')
    })

    it('should show the edit button when hover a category', () => {
        cy.get(':nth-child(1) > .group > h3').contains('Beverages')
        cy.get(':nth-child(1) > .group > h3').trigger('mouseover')
        cy.get(':nth-child(1) > .group > svg').should(
            'have.css',
            'opacity',
            '1'
        )
        cy.get(':nth-child(1) > .group > h3').click()
        cy.get('.mb-4 > .flex > input')
    })

    it('should not authorize category to update if length < 2 characters', () => {
        cy.get(':nth-child(1) > .group > h3').contains('Beverages')
        cy.get(':nth-child(1) > .group > h3').click()
        cy.get('input[name="category"]').clear()
        cy.get('input[name="category"]').type('a')

        cy.get('.mb-4 > .flex > svg').click()
        cy.get('span').contains('category must be at least 2 characters')
    })
})
