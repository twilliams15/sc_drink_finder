import React from 'react'
import {allIngredients} from '../data/all_ingredients'
import {AvailableDrinks, CurrentStock} from '../App'
import {getAvailableDrinks, hyphenate} from '../support/helpers'

export function InStock() {
    const [stock, setStock] = React.useContext(CurrentStock)
    const [, setDisplayedDrinks] = React.useContext(AvailableDrinks)

    React.useEffect(() => {
        setDisplayedDrinks(getAvailableDrinks(stock))
    }, [stock])

    function onStockChange(e: React.ChangeEvent<HTMLInputElement>) {
        const stockItem = e.target
        setStock(
            stockItem.checked
                ? [...stock, stockItem.value]
                : stock.filter((item: string) => item !== stockItem.value)
        )
    }

    const [symbol, setSymbol] = React.useState('+')
    function toggleSymbol() {
        symbol === '+' ? setSymbol('–') : setSymbol('+')
    }

    const [showStock, setShowStock] = React.useState(false)
    function toggleStock() {
        setShowStock(!showStock)
        toggleSymbol()
    }

    function ListStockIngredients() {
        return (
            <>
                {[...Object.keys(allIngredients)].sort().map(cat => (
                    <ul key={cat}>
                        ~{cat}~
                        {[...Object.keys(allIngredients[cat])]
                            .sort()
                            .map(ing => {
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
                ))}
            </>
        )
    }

    return (
        <form id="in-stock">
            <p onClick={toggleStock}>
                <strong>
                    Current stock <em>({symbol})</em>
                </strong>
            </p>
            {showStock && (
                <>
                    <ListStockIngredients />
                    <p onClick={toggleStock} style={{marginLeft: '3rem'}}>
                        <em>~ close ~</em>
                    </p>
                </>
            )}
            <p>With what you have in stock...</p>
        </form>
    )
}
