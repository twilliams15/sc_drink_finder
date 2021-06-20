import React from 'react'
import {CurrentStock} from '../App'
import {Cocktail} from '../react-app-env'
import {hyphenate} from '../support/helpers'

type Props = {drink: Cocktail}

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
                        {stock.includes(i) ? i : highlight(i)}
                    </li>
                ))}
            </section>
        )

        function highlight(item: string) {
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
