import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './styles.css'
import {getAvailableDrinks} from './support/helpers'
import {
    DrinkList,
    Insights,
    InStock,
    Menu,
    NavBar,
    Rums,
    Search,
} from './modules'
import {Cocktail} from './react-app-env'
import {useLocalStorageState} from './support/hooks'

export const AvailableDrinks = React.createContext<
    [Cocktail[], React.Dispatch<React.SetStateAction<Cocktail[]>>]
>([[], () => {}])

export const CurrentStock = React.createContext<
    [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[], () => {}])

export default function App() {
    const [stock, setStock] = useLocalStorageState('sc-stock', [])
    const [displayedDrinks, setDisplayedDrinks] = React.useState(() =>
        getAvailableDrinks(stock)
    )

    return (
        <CurrentStock.Provider value={[stock, setStock]}>
            <AvailableDrinks.Provider
                value={[displayedDrinks, setDisplayedDrinks]}
            >
                <Router>
                    <h1>Smuggler’s Companion</h1>
                    <NavBar />
                    <Switch>
                        <Route path="/menu">
                            <Menu />
                        </Route>
                        <Route path="/search">
                            <Search />
                            <DrinkList />
                        </Route>
                        <Route path="/insights">
                            <Insights />
                            <DrinkList />
                        </Route>
                        <Route path="/rums">
                            <Rums />
                        </Route>
                        <Route path="/">
                            <InStock />
                            <DrinkList />
                        </Route>
                    </Switch>
                    <footer />
                </Router>
            </AvailableDrinks.Provider>
        </CurrentStock.Provider>
    )
}
