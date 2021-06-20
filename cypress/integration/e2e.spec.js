beforeEach(() => {
    cy.viewport('iphone-x')
    cy.visit('/')
})

describe('keeping stock', () => {
    it('expanding stock shows stock items', () => {
        cy.contains(/blended aged rum/i).should('not.be.visible')
        cy.contains(/current stock/i).click()
        cy.contains(/blended aged rum/i).should('be.visible')
    })

    it('stores stock in local storage', () => {
        cy.contains(/current stock/i).click()
        cy.contains(/herbstura/i)
            .click()
            .then(() => {
                expect(localStorage.getItem('sc-stock')).to.equal('herbstura')
            })
    })

    it('reads stock from local storage', () => {
        localStorage.setItem('sc-stock', 'herbstura')
        cy.reload()
        cy.contains(/current stock/i).click()
        cy.getByLabel(/herbstura/i).should('be.checked')
    })

    it('search by stock returns correct drinks', () => {
        cy.contains(/current stock/i).click()
        cy.contains('lime juice').click()
        cy.contains('demerara syrup').click()
        cy.contains('allspice dram').click()
        cy.contains('blended aged rum (3)').click()
        cy.contains('angostura bitters').click()
        cy.get('.drink')
            .should('have.length', 3)
            .and('include.text', 'Planter’s Punch')
            .and('include.text', 'Bombo')
            .and('include.text', 'Barbados Rum Punch')
    })
})

describe('searching for drinks', () => {
    beforeEach(() => {
        cy.contains('Search').click()
    })

    it('search for drink returns correct drink', () => {
        cy.getByLabel(/by name/i).type('zom')
        cy.get('.drink').should('have.length', 1).and('include.text', 'Zombie')
    })

    it('search for ingredient returns correct drinks', () => {
        cy.getByLabel(/by ingredient/i).type('spark')
        cy.get('.drink')
            .each(d => d.children())
            .should('include.text', 'sparkling')
    })

    it('search for rum number returns correct drinks', () => {
        cy.getByLabel(/by rum number/i).select('8')
        cy.get('.drink')
            .each(d => d.children())
            .should(
                'include.text',
                'cane aoc martinique rhum agricole vieux (8)'
            )
    })
})

describe('insights', () => {
    beforeEach(() => {
        cy.contains(/current stock/i).click()
        cy.contains('lime juice').click()
        cy.contains('demerara syrup').click()
        cy.contains('allspice dram').click()
        cy.contains('blended aged rum (3)').click()
        cy.contains('angostura bitters').click()

        cy.contains('Insights').click()
    })

    it('find drinks missing 1 ingredient returns correct drinks', () => {
        cy.get('.drink')
            .should('have.length', 5)
            .and('include.text', 'Grog')
            .and('include.text', 'Rum Flip')
            .and('include.text', 'Daiquiri No. 1')
            .and('include.text', 'Corn & Oil')
            .and('include.text', 'Paniolo Old-Fashioned')
    })

    it('suggestions appear when more than 1 drink can be made with 1 additional ingredient', () => {
        cy.contains('In Stock').click()
        cy.contains('lime juice').click()
        cy.contains('Insights').click()
        cy.contains('With lime juice, you could make 2 more drinks!').should(
            'be.visible'
        )
    })
})
