import React from 'react'
import {CurrentStock} from '../App'
import {Cocktail} from '../react-app-env'

type Props = {drink: Cocktail}

export function Drink({drink: {ingredients, name, page}}: Props) {
    const stock = React.useContext(CurrentStock)
    const [showDetails, setShowDetails] = React.useState(false)

    function toggleDetails() {
        setShowDetails(!showDetails)
    }

    function NameAndPage() {
        return (
            <h2 aria-label={name}>
                {name}&nbsp;&nbsp;
                <span style={{fontSize: '1.25rem'}}>p.&nbsp;{page}</span>
            </h2>
        )
    }

    function IngredientsList() {
        return (
            <section style={{textIndent: '1rem', marginTop: 0}}>
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
        <div onClick={toggleDetails}>
            <NameAndPage />
            <IngredientsList />
        </div>
    )
}
