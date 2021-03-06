import React from 'react'
import {AvailableDrinks} from '../App'
import {findDrinksByIngredient, findDrinksByName} from '../support/helpers'

export function Search() {
    const [, setDisplayedDrinks] = React.useContext(AvailableDrinks)

    React.useEffect(() => {
        setDisplayedDrinks([])
    }, [])

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDisplayedDrinks(findDrinksByName(e.target.value))
    }

    function onIngredientChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setDisplayedDrinks(findDrinksByIngredient(e.target.value))
    }

    return (
        <form id="search">
            <p>Search for a drink</p>
            <label htmlFor="drinkName">by name: </label>
            <input
                id="drinkName"
                type="text"
                autoComplete="off"
                onChange={onNameChange}
            />
            <br />
            <label htmlFor="ingredient">by ingredient: </label>
            <input
                id="ingredient"
                type="text"
                autoComplete="off"
                onChange={onIngredientChange}
            />
            <br />
            <label htmlFor="rum">by rum number: </label>
            <select id="rum" onChange={onIngredientChange}>
                <option value="---">-</option>
                <option value="(1)">1</option>
                <option value="(2)">2</option>
                <option value="(3)">3</option>
                <option value="(4)">4</option>
                <option value="(5)">5</option>
                <option value="(6)">6</option>
                <option value="(7)">7</option>
                <option value="(8)">8</option>
            </select>
        </form>
    )
}
