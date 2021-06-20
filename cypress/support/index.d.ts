declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * gets a field by its label
         * @param label
         */
        getByLabel(label: string | regex): Cypress.Chainable<Subject>
    }
}
