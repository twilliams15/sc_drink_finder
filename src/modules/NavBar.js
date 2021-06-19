import nav from '../support/nav'
import React from 'react'
import {
    findDrinksMissingOneIngredient,
    getAvailableDrinks,
} from '../support/helpers'
import {CurrentStock} from '../App'

export function NavBar({setDisplayedDrinks}) {
    const stock = React.useContext(CurrentStock)

    function clickInStock() {
        nav.displayInStock()
        setDisplayedDrinks(getAvailableDrinks(stock))
    }

    function clickSearch() {
        nav.displaySearch()
        setDisplayedDrinks([])
    }

    function clickInsights() {
        nav.displayInsights()
        setDisplayedDrinks(findDrinksMissingOneIngredient(stock))
    }

    function clickRums() {
        nav.displayRums()
    }

    return (
        <nav>
            <ul>
                <li onClick={clickInStock}>In Stock</li>
                <li onClick={clickSearch}>Search</li>
                <li onClick={clickInsights}>Insights</li>
                <li onClick={clickRums}>Rums</li>
            </ul>
        </nav>
    )
}
