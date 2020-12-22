import {Drink} from '../Drink'
import React from 'react'
import {mount} from 'cypress-react-unit-test'
import i from "../../data/all_ingredients"
import '../../styles.css'

const drink = {
    name: 'Aku Aku',
    page: 39,
    ingredients: [
        i.misc.pineapple,
        i.misc.mint,
        i.juices.lime,
        i.syrups.demerara,
        i.liqueurs.peach,
        i.rums.blended_lightly_aged,
    ],
}

const inStock = [
    i.misc.mint,
    i.juices.lime,
    i.syrups.demerara,
    i.rums.blended_lightly_aged,
]

before(() => {
    mount(<Drink drink={drink} inStock={inStock} />)
})

it('looks the same as it did last time', () => {
    cy.percySnapshot('Drink')
})

it('renders a title, page number, and list of ingredients', () => {
    cy.get('h2').should('have.text', `${drink.name}  p. ${drink.page}`)
    cy.get('.ingredients li').should('have.length', drink.ingredients.length)
    drink.ingredients.forEach(ingredient => {
        cy.get('.ingredients').should('contain.text', ingredient)
    })
})

it('adds an asterisk to missing ingredients', () => {
    drink.ingredients.forEach(ingredient => {
        if (!inStock.includes(ingredient)) {
            cy.get('.ingredients').should('contain.text', `${ingredient} *`)
        }
    })
})