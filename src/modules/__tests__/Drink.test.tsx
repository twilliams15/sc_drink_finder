import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

import {Drink} from '../Drink'
import drinks from '../../data/all_drinks'
import i from '../../data/all_ingredients'

const testProps = {
    drink: drinks[0],
    inStock: [i.juices.lime, i.syrups.demerara],
}

function renderDrink(overrides = {}) {
    const props = {...testProps, overrides}
    return render(<Drink {...props} />)
}

describe('defaults', () => {
    beforeEach(() => {
        renderDrink()
    })

    it('displays the drink title', () => {
        const title = screen.getByRole('heading', {name: /aku aku/i})
        expect(title).toBeVisible()
    })

    it('displays a page number', () => {
        const pageNum = screen.getByText(/p\..\d+/i)
        expect(pageNum).toBeVisible()
    })

    it('displays a list of ingredients', () => {
        const ingredients = screen.getAllByRole('listitem')
        ingredients.forEach(i => {
            expect(i).toBeVisible()
        })
    })

    it('highlights missing ingredients', () => {
        const missingIngredients = [
            i.misc.pineapple,
            i.misc.mint,
            i.liqueurs.peach,
            i.rums.blended_lightly_aged,
        ]
        missingIngredients.forEach(i => {
            const missingIngredient = screen.getByRole('listitem', {name: i})
            expect(missingIngredient).toHaveTextContent(`${i} *`)
        })
    })
})
