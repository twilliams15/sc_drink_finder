import React from 'react'
import './styles.css'
import {
    findDrinksByIngredient,
    findDrinksByName,
    findDrinksMissingOneIngredient,
    getAvailableDrinks,
} from './support/helpers'
import {SearchForm} from './modules/SearchForm'
import {InStock} from './modules/InStock'
import {DrinkList} from './modules/DrinkList'
import {Insights} from './modules/Insights'
import {Rums} from './modules/Rums'

export const AvailableDrinks = React.createContext([])
export const CurrentStock = React.createContext('')

export default function App() {
    const [stock, setStock] = React.useState(
        window.localStorage.getItem('stock') || ''
    )
    const [displayedDrinks, setDisplayedDrinks] = React.useState(
        getAvailableDrinks(stock)
    )

    function onStockChange(e) {
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

    const onNameChange = e =>
        setDisplayedDrinks(findDrinksByName(e.target.value))
    const onIngredientChange = e =>
        setDisplayedDrinks(findDrinksByIngredient(e.target.value))

    function show(elementId) {
        document.getElementById(elementId).style.display = 'block'
    }

    function hide(elementId) {
        document.getElementById(elementId).style.display = 'none'
    }

    function displayInStock() {
        show('in-stock')
        show('drink-list')
        hide('search')
        hide('insights')
        hide('rums')
        setDisplayedDrinks(getAvailableDrinks(stock))
    }

    function displaySearch() {
        show('search')
        show('drink-list')
        hide('in-stock')
        hide('insights')
        hide('rums')
        setDisplayedDrinks([])
    }

    function displayInsights() {
        show('insights')
        show('drink-list')
        hide('search')
        hide('in-stock')
        hide('rums')
        setDisplayedDrinks(findDrinksMissingOneIngredient(stock))
    }

    function displayRums() {
        show('rums')
        hide('search')
        hide('in-stock')
        hide('insights')
        hide('drink-list')
    }

    function NavBar() {
        return (
            <nav>
                <ul>
                    <li onClick={displayInStock}>In Stock</li>
                    <li onClick={displaySearch}>Search</li>
                    <li onClick={displayInsights}>Insights</li>
                    <li onClick={displayRums}>Rums</li>
                </ul>
            </nav>
        )
    }

    return (
        <AvailableDrinks.Provider value={displayedDrinks}>
            <CurrentStock.Provider value={stock}>
                <h1>Smuggler’s Companion</h1>
                <NavBar />
                <InStock onStockChange={onStockChange} />
                <SearchForm
                    onNameChange={onNameChange}
                    onIngredientChange={onIngredientChange}
                />
                <Insights />
                <Rums />
                <DrinkList />
                <footer />
            </CurrentStock.Provider>
        </AvailableDrinks.Provider>
    )
}
