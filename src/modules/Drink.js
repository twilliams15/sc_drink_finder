import React from 'react'

export function Drink({drink, inStock}) {
    function nameAndPage(drink) {
        return (
            <>
                {drink.name}&nbsp;&nbsp;
                <span className="page">p.&nbsp;{drink.page}</span>
            </>
        )
    }

    function ingredientsList(drink, inStock) {
        return (
            <>
                {drink.ingredients.map(i => (
                    <li key={i} aria-label={i}>
                        {inStock.includes(i) ? i : highlightListItem(i)}
                    </li>
                ))}
            </>
        )

        function highlightListItem(item) {
            return `${item} *`
        }
    }

    return (
        <div className="drink">
            <h2 aria-label={drink.name}>{nameAndPage(drink)}</h2>
            <section className="ingredients">
                {ingredientsList(drink, inStock)}
            </section>
        </div>
    )
}
