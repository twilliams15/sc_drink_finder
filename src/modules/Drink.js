import React from 'react'
import {CurrentStock} from '../App'

export function Drink({drink: {ingredients, name, page}}) {
    const stock = React.useContext(CurrentStock)

    function NameAndPage() {
        return (
            <h2 aria-label={name}>
                {name}&nbsp;&nbsp;
                <span className="page">p.&nbsp;{page}</span>
            </h2>
        )
    }

    function IngredientsList() {
        return (
            <section className="ingredients">
                {ingredients.map(i => (
                    <li key={i} aria-label={i}>
                        {stock.includes(i) ? i : highlightListItem(i)}
                    </li>
                ))}
            </section>
        )

        function highlightListItem(item) {
            return `${item} *`
        }
    }

    return (
        <div className="drink">
            <NameAndPage />
            <IngredientsList />
        </div>
    )
}
