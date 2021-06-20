Cypress.Commands.add('getByLabel', label => {
    return cy
        .contains('label', label)
        .invoke('attr', 'for')
        .then(id => cy.get(`#${id}`))
})
