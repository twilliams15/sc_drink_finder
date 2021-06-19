import React from 'react'
import {Drink} from './Drink'
import {AvailableDrinks} from '../App'

export function DrinkList() {
    const drinks = React.useContext(AvailableDrinks) ?? []

    function NumDrinks() {
        const numDrinks = drinks.length
        return (
            <p>
                {numDrinks} {numDrinks === 1 ? 'drink' : 'drinks'} found
            </p>
        )
    }

    function DrinkMap() {
        return drinks.map(drink => <Drink key={drink.name} drink={drink} />)
    }

    return (
        <div id="drink-list">
            <NumDrinks />
            <DrinkMap />
        </div>
    )
}
