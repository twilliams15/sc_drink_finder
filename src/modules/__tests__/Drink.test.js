import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

import {Drink} from '../Drink'
import {CurrentStock} from '../../App'

const drink = {
    name: 'Daiquiri',
    page: 1,
    ingredients: ['rum', 'lime juice', 'simple syrup'],
}

const stock = ['rum', 'lime juice']

const wrapper = ({children}) => (
    <CurrentStock.Provider value={stock}>{children}</CurrentStock.Provider>
)

describe('Drink', () => {
    beforeEach(() => {
        render(<Drink drink={drink} />, {wrapper})
    })

    it('displays a drink name', () => {
        expect(screen.getByRole('heading', {name: drink.name})).toBeVisible()
    })

    it('displays a page number', () => {
        expect(screen.getByText(drink.page, {exact: false})).toBeVisible()
    })

    it('displays a list of ingredients', () => {
        drink.ingredients.forEach(ingredient => {
            const item = screen.getByRole('listitem', {name: ingredient})
            expect(item).toBeVisible()
        })
    })

    it('highlights missing ingredients', () => {
        drink.ingredients.every(ingredient => {
            const item = screen.getByRole('listitem', {name: ingredient})
            return stock.includes(ingredient)
                ? expect(item).not.toHaveTextContent('*')
                : expect(item).toHaveTextContent('*')
        })
    })
})
