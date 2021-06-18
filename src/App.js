import React from 'react'
import './styles.css'
import allDrinks from './data/all_drinks'
import {
    findDrinksByIngredient,
    findDrinksByName,
    findDrinksMissingOneIngredient,
} from './support/helpers'
import {SearchForm} from './modules/SearchForm'
import {InStock} from './modules/InStock'
import {DrinkList} from './modules/DrinkList'
import {Insights} from './modules/Insights'
import {Rums} from './modules/Rums'

export default function App() {
    const [stock, setStock] = React.useState(
        window.localStorage.getItem('stock') || ''
    )
    const [displayedDrinks, setDisplayedDrinks] = React.useState(
        getAvailableDrinks(stock)
    )

    function getAvailableDrinks(fromStock = stock) {
        return allDrinks.filter(d =>
            d.ingredients.every(i => fromStock.includes(i))
        )
    }

    function handleStockChange(e) {
        let tempStock = stock
        const item = e.target
        const addItemToTempStock = () => (tempStock += item.id)
        const removeItemFromTempStock = () =>
            (tempStock = tempStock.replace(item.id, ''))
        item.checked ? addItemToTempStock() : removeItemFromTempStock()
        setStock(tempStock)
        window.localStorage.setItem('stock', tempStock)
        setDisplayedDrinks(getAvailableDrinks(tempStock))
    }

    function displayInStock() {
        document.getElementById('in-stock').style.display = 'block'
        document.getElementById('drink-list').style.display = 'block'
        ;[
            document.getElementById('search'),
            document.getElementById('insights'),
            document.getElementById('rums'),
        ].forEach(m => {
            m.style.display = 'none'
        })
        setDisplayedDrinks(getAvailableDrinks())
    }

    function displaySearch() {
        document.getElementById('search').style.display = 'block'
        document.getElementById('drink-list').style.display = 'block'
        ;[
            document.getElementById('in-stock'),
            document.getElementById('insights'),
            document.getElementById('rums'),
        ].forEach(m => {
            m.style.display = 'none'
        })
        setDisplayedDrinks([])
    }

    function displayInsights() {
        document.getElementById('insights').style.display = 'block'
        document.getElementById('drink-list').style.display = 'block'
        ;[
            document.getElementById('search'),
            document.getElementById('in-stock'),
            document.getElementById('rums'),
        ].forEach(m => {
            m.style.display = 'none'
        })
        setDisplayedDrinks(findDrinksMissingOneIngredient(stock))
    }

    function displayRums() {
        document.getElementById('rums').style.display = 'block'
        ;[
            document.getElementById('search'),
            document.getElementById('in-stock'),
            document.getElementById('insights'),
            document.getElementById('drink-list'),
        ].forEach(m => {
            m.style.display = 'none'
        })
    }

    return (
        <div>
            <h1>Smuggler’s Companion</h1>
            <nav>
                <ul>
                    <li onClick={displayInStock}>In Stock</li>
                    <li onClick={displaySearch}>Search</li>
                    <li onClick={displayInsights}>Insights</li>
                    <li onClick={displayRums}>Rums</li>
                </ul>
            </nav>
            <InStock onStockChange={handleStockChange} inStock={stock} />
            <SearchForm
                onNameChange={e =>
                    setDisplayedDrinks(findDrinksByName(e.target.value))
                }
                onIngredientChange={e =>
                    setDisplayedDrinks(findDrinksByIngredient(e.target.value))
                }
            />
            <Insights inStock={stock} />
            <Rums />
            <DrinkList drinks={displayedDrinks} inStock={stock} />
            <footer />
        </div>
    )
}
