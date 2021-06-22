import React from 'react'
import {AvailableDrinks, CurrentStock} from '../App'
import {getAvailableDrinks} from '../support/helpers'

export function Menu() {
    const [stock] = React.useContext(CurrentStock)
    const [, setDisplayedDrinks] = React.useContext(AvailableDrinks)
    const availableDrinks = getAvailableDrinks(stock)

    React.useEffect(() => {
        setDisplayedDrinks(availableDrinks)
    }, [])

    function Drink({name}: {name: string}) {
        return <h2>{name}</h2>
    }

    function Ingredients({items}: {items: string[]}) {
        const removeParens = (item: string) => item.substr(0, item.indexOf('('))

        return (
            <ul>
                {items.map(item => (
                    <li>{item.includes('(') ? removeParens(item) : item}</li>
                ))}
            </ul>
        )
    }

    return (
        <div>
            {availableDrinks.map(drink => (
                <>
                    <Drink name={drink.name} />
                    <Ingredients items={drink.ingredients} />
                </>
            ))}
        </div>
    )
}
