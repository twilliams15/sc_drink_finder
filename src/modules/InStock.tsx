import React from 'react'
import {allIngredients} from '../data/all_ingredients'
import {CurrentStock} from '../App'
import {hyphenate} from '../support/helpers'

type Props = {
    onStockChange: React.ChangeEventHandler<HTMLInputElement>
}

export function InStock({onStockChange}: Props) {
    const stock = React.useContext(CurrentStock)

    const [symbol, setSymbol] = React.useState('+')
    function toggleSymbol() {
        symbol === '+' ? setSymbol('–') : setSymbol('+')
    }

    const [showStock, setShowStock] = React.useState(false)
    function toggleStock() {
        setShowStock(!showStock)
        toggleSymbol()
    }

    function listStockIngredients() {
        return [...Object.keys(allIngredients)].sort().map(cat => (
            <ul key={cat}>
                ~{cat}~
                {[...Object.keys(allIngredients[cat])].sort().map(ing => {
                    const ingredient = allIngredients[cat][ing]
                    return (
                        <li key={ingredient}>
                            <input
                                id={hyphenate(ingredient)}
                                type="checkbox"
                                onChange={onStockChange}
                                checked={stock.includes(ingredient)}
                                value={ingredient}
                            />
                            <label htmlFor={hyphenate(ingredient)}>
                                {ingredient}
                            </label>
                        </li>
                    )
                })}
            </ul>
        ))
    }

    return (
        <form id="in-stock">
            <p className="accordion" onClick={toggleStock}>
                <strong>
                    Current stock <em>({symbol})</em>
                </strong>
            </p>
            {showStock && listStockIngredients()}
            <p>With what you have in stock...</p>
        </form>
    )
}
