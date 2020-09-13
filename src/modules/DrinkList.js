import React from 'react'
import {Drink} from './Drink'

export function DrinkList({drinks, inStock}) {
  let drinkList = []
  if (drinks) {
    drinkList = drinks.map((d) => <Drink key={d.name} drink={d} inStock={inStock}/>)
  }
  return (
    <div className="drink-list">
      <p>
        {drinkList.length} {drinkList.length === 1 ? 'drink' : 'drinks'} found
      </p>
      {drinkList}
    </div>
  )
}
