import React from 'react'
import './styles.css'
import {
    findDrinksByIngredient,
    findDrinksByName,
    getAvailableDrinks,
} from './support/helpers'
import {DrinkList, Insights, InStock, NavBar, Rums, SearchForm} from './modules'
import {Cocktail} from './react-app-env'

export const AvailableDrinks = React.createContext<Cocktail[]>([])
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

    function onStockChange(e: React.ChangeEvent<HTMLInputElement>) {
        let currentStock = stock
        setStock(
            e.target.checked
                ? currentStock + e.target.id
                : currentStock.replace(e.target.id, '')
        )
    }

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDisplayedDrinks(findDrinksByName(e.target.value))
    }

    function onIngredientChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
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
