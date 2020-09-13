beforeEach(() => {
  cy.viewport('iphone-x')
  cy.visit('/')
})

describe('searching for drinks', () => {
  it('search for drink returns correct drink', () => {
    cy.get('#drinkName').type('zom')
    cy.get('.drink').should('have.length', 1)
      .and('include.text', 'Zombie')
  })

  it('search for ingredient returns correct drinks', () => {
    cy.get('#ingredient').type('spark')
    cy.get('.drink').each(d => d.children())
      .should('include.text', 'sparkling')
  })

  it('search for rum number returns correct drinks', () => {
    cy.get('#rum').select('8')
    cy.get('.drink').each(d => d.children())
      .should('include.text', 'cane aoc martinique rhum agricole vieux (8)')
  })
})

describe('keeping stock', () => {
  it('expanding stock shows stock items', () => {
    cy.get('.stock').should('not.be.visible')
    cy.get('.accordion').click()
    cy.get('.stock').should('be.visible')
  })

  it('stores stock in local storage', () => {
    cy.get('.accordion').click()
    cy.get('#herbstura').check().then(() => {
      expect(localStorage.getItem('inStock')).to.equal('herbstura')
    })
  })

  it('search by stock returns correct drinks', () => {
    cy.get('.accordion').click()
    cy.contains('lime juice').click()
    cy.contains('demerara syrup').click()
    cy.contains('allspice dram').click()
    cy.contains('blended aged rum (3)').click()
    cy.contains('angostura bitters').click()
    cy.contains('Search by stock').click()
    cy.get('.drink').should('have.length', 4)
      .and('include.text', 'Planter’s Punch')
      .and('include.text', 'Grog')
      .and('include.text', 'Bombo')
      .and('include.text', 'Barbados Rum Punch')
  })
})