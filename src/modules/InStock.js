import React from 'react'
import allIngredients from '../data/all_ingredients'
import {CurrentStock} from '../App'

export function InStock({onStockChange}) {
    const stock = React.useContext(CurrentStock)
    const [symbol, setSymbol] = React.useState('+')

    function toggleAccordion() {
        ;[...document.getElementsByClassName('stock')].forEach(
            toggleItemDisplay
        )
        toggleSymbol()
    }

    function toggleSymbol() {
        symbol === '+' ? setSymbol('–') : setSymbol('+')
    }

    function toggleItemDisplay(item) {
        item.style.display === 'block'
            ? (item.style.display = 'none')
            : (item.style.display = 'block')
    }

    return (
        <form id="in-stock">
            <p className="accordion" onClick={toggleAccordion}>
                <strong>
                    Current stock <em>({symbol})</em>
                </strong>
            </p>
            {[...Object.keys(allIngredients)].sort().map(c => (
                <ul key={c} className="stock">
                    ~{c}~
                    {[...Object.keys(allIngredients[c])].sort().map(i => {
                        return (
                            <li key={allIngredients[c][i]} className="stock">
                                <input
                                    id={allIngredients[c][i]}
                                    type="checkbox"
                                    onChange={onStockChange}
                                    checked={stock.includes(
                                        allIngredients[c][i]
                                    )}
                                />
                                <label htmlFor={allIngredients[c][i]}>
                                    {allIngredients[c][i]}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            ))}
            <p>With what you have in stock...</p>
        </form>
    )
}
