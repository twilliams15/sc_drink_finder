import React from 'react'
import {CurrentStock} from '../App'
import {Cocktail} from '../react-app-env'

type Props = {
    drink: Cocktail
}

export function Drink({drink: {ingredients, name, page}}: Props) {
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

        function highlightListItem(item: string) {
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
