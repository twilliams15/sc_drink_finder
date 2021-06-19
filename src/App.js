import React from 'react'
import './styles.css'
import {
    findDrinksByIngredient,
    findDrinksByName,
    getAvailableDrinks,
} from './support/helpers'
import {NavBar} from './modules/NavBar'
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

    return (
        <AvailableDrinks.Provider value={displayedDrinks}>
            <CurrentStock.Provider value={stock}>
                <h1>Smuggler’s Companion</h1>
                <NavBar setDisplayedDrinks={setDisplayedDrinks} />
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
