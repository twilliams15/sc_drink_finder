import React from 'react'
import {Drink} from './Drink'

export function DrinkList({drinks, inStock}) {
  const drinkList = buildDrinkList(drinks, inStock)

  function buildDrinkList(drinks, inStock) {
    if (drinks) {
      return drinks.map((d) => <Drink key={d.name} drink={d} inStock={inStock}/>)
    } else {
      return []
    }
  }

  function numDrinksFound(drinkList) {
    return <>{drinkList.length} {drinkList.length === 1 ? 'drink' : 'drinks'} found</>
  }

  return (
    <div id="drink-list">
      <p>{numDrinksFound(drinkList)}</p>
      {drinkList}
    </div>
  )
}
