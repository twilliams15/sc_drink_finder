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

    function MenuDrink({name}: {name: string}) {
        return <h2 style={{color: 'teal'}}>{name}</h2>
    }

    function MenuIngredients({items}: {items: string[]}) {
        const removeParens = (item: string) => item.substr(0, item.indexOf('('))

        return (
            <>
                <ul style={{padding: 0, marginTop: '-0.4rem'}}>
                    {items.map(item => (
                        <li key={item}>
                            {item.includes('(') ? removeParens(item) : item}
                        </li>
                    ))}
                </ul>
                ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
            </>
        )
    }

    return (
        <div
            style={{
                textAlign: 'center',
                paddingBottom: '4rem',
            }}
        >
            <h1 style={{color: 'teal'}}>Drink Menu</h1>
            {availableDrinks.map(drink => (
                <div key={drink.name}>
                    <MenuDrink name={drink.name} />
                    <MenuIngredients items={drink.ingredients} />
                </div>
            ))}
        </div>
    )
}
