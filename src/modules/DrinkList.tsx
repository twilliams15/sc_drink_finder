import React from 'react'
import {Drink} from './Drink'
import {AvailableDrinks} from '../App'

export function DrinkList() {
    const [drinks] = React.useContext(AvailableDrinks)
    const numDrinks = drinks.length

    return (
        <div id="drink-list">
            <p>
                {numDrinks} {numDrinks === 1 ? 'drink' : 'drinks'} found
            </p>
            {drinks.map(drink => (
                <Drink key={drink.name} drink={drink} />
            ))}
        </div>
    )
}
