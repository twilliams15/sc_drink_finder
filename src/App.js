import React from 'react'
import './styles.css'
import {
    findDrinksByIngredient,
    findDrinksByName,
    findDrinksMissingOneIngredient,
    getAvailableDrinks,
} from './support/helpers'
import nav from './support/nav'
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

    React.useEffect(() => {
        window.localStorage.setItem('stock', stock)
        setDisplayedDrinks(getAvailableDrinks(stock))
    }, [stock])

    function onStockChange(e) {
        let currentStock = stock
        setStock(
            e.target.checked
                ? currentStock + e.target.id
                : currentStock.replace(e.target.id, '')
        )
    }

    function onNameChange(e) {
        setDisplayedDrinks(findDrinksByName(e.target.value))
    }

    function onIngredientChange(e) {
        setDisplayedDrinks(findDrinksByIngredient(e.target.value))
    }

    function displayInStock() {
        nav.displayInStock()
        setDisplayedDrinks(getAvailableDrinks(stock))
    }

    function displaySearch() {
        nav.displaySearch()
        setDisplayedDrinks([])
    }

    function displayInsights() {
        nav.displayInsights()
        setDisplayedDrinks(findDrinksMissingOneIngredient(stock))
    }

    function NavBar() {
        return (
            <nav>
                <ul>
                    <li onClick={displayInStock}>In Stock</li>
                    <li onClick={displaySearch}>Search</li>
                    <li onClick={displayInsights}>Insights</li>
                    <li onClick={nav.displayRums}>Rums</li>
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
