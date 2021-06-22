import React from 'react'
import {AvailableDrinks, CurrentStock} from '../App'
import {getAvailableDrinks} from '../support/helpers'

export function Menu() {
    const [stock] = React.useContext(CurrentStock)
    const [, setDisplayedDrinks] = React.useContext(AvailableDrinks)

    React.useEffect(() => {
        setDisplayedDrinks(getAvailableDrinks(stock))
    }, [])

    return <div>Hello World</div>
}
