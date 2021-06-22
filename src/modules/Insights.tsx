import React from 'react'
import {
    countDrinksMissingMostCommonIngredient,
    findDrinksMissingOneIngredient,
    mostCommonMissingIngredient,
} from '../support/helpers'
import {AvailableDrinks, CurrentStock} from '../App'

export function Insights() {
    const [stock] = React.useContext(CurrentStock)
    const [, setDisplayedDrinks] = React.useContext(AvailableDrinks)

    React.useEffect(() => {
        setDisplayedDrinks(findDrinksMissingOneIngredient(stock))
    }, [])

    return (
        <div id="insights">
            {countDrinksMissingMostCommonIngredient(stock) > 1 ? (
                <>
                    <p>
                        <strong>
                            With {mostCommonMissingIngredient(stock)}, you could
                            make {countDrinksMissingMostCommonIngredient(stock)}{' '}
                            more drinks!
                        </strong>
                    </p>
                    <p>
                        They’re listed below, along with the other drinks
                        missing just 1 ingredient...
                    </p>
                </>
            ) : (
                <p>Here are the drinks missing just 1 ingredient...</p>
            )}
        </div>
    )
}
