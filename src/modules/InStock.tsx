import React from 'react'
import {allIngredients} from '../data/all_ingredients'
import {CurrentStock} from '../App'

type Props = {
    onStockChange: React.ChangeEventHandler<HTMLInputElement>
}

export function InStock({onStockChange}: Props) {
    const stock = React.useContext(CurrentStock)
    const [symbol, setSymbol] = React.useState('+')

    function toggleSymbol() {
        symbol === '+' ? setSymbol('–') : setSymbol('+')
    }

    function toggleAccordion() {
        const stockList = document.getElementsByClassName('stock')
        // @ts-ignore
        ;[...stockList].forEach(toggleItemDisplay)
        toggleSymbol()
    }

    function toggleItemDisplay(item: HTMLElement) {
        item.style.display === 'block'
            ? (item.style.display = 'none')
            : (item.style.display = 'block')
    }

    function listStockIngredients() {
        return [...Object.keys(allIngredients)].sort().map(cat => (
            <ul key={cat} className="stock">
                ~{cat}~
                {[...Object.keys(allIngredients[cat])].sort().map(ing => {
                    const ingredient = allIngredients[cat][ing]
                    return (
                        <li key={ingredient} className="stock">
                            <input
                                id={ingredient}
                                type="checkbox"
                                onChange={onStockChange}
                                checked={stock.includes(ingredient)}
                            />
                            <label htmlFor={ingredient}>{ingredient}</label>
                        </li>
                    )
                })}
            </ul>
        ))
    }

    return (
        <form id="in-stock">
            <p className="accordion" onClick={toggleAccordion}>
                <strong>
                    Current stock <em>({symbol})</em>
                </strong>
            </p>
            {listStockIngredients()}
            <p>With what you have in stock...</p>
        </form>
    )
}
