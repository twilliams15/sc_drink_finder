import React from 'react'
import './styles.css'
import {
    findDrinksByIngredient,
    findDrinksByName,
    getAvailableDrinks,
} from './support/helpers'
import {DrinkList, Insights, InStock, NavBar, Rums, Search} from './modules'
import {Cocktail} from './react-app-env'
import {useLocalStorageState} from './support/hooks'

export const AvailableDrinks = React.createContext<Cocktail[]>([])
export const CurrentStock = React.createContext<string[]>([])

export default function App() {
    const [stock, setStock] = useLocalStorageState('sc-stock', [])
    const [displayedDrinks, setDisplayedDrinks] = React.useState(() =>
        getAvailableDrinks(stock)
    )

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

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDisplayedDrinks(findDrinksByName(e.target.value))
    }

    function onIngredientChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setDisplayedDrinks(findDrinksByIngredient(e.target.value))
    }

    return (
        <CurrentStock.Provider value={stock}>
            <AvailableDrinks.Provider value={displayedDrinks}>
                <h1>Smuggler’s Companion</h1>
                <NavBar setDisplayedDrinks={setDisplayedDrinks} />
                <InStock onStockChange={onStockChange} />
                <Search
                    onNameChange={onNameChange}
                    onIngredientChange={onIngredientChange}
                />
                <Insights />
                <Rums />
                <DrinkList />
                <footer />
            </AvailableDrinks.Provider>
        </CurrentStock.Provider>
    )
}
