import React from 'react'
import './styles.css'
import allDrinks from './data/all_drinks'
import {findDrinksByIngredient, findDrinksByName} from './support/helpers'
import {SearchForm} from './modules/SearchForm'
import {InStock} from './modules/InStock'
import {DrinkList} from './modules/DrinkList'

export default function App() {
  const [currentDrinks, setCurrentDrinks] = React.useState(null)
  const [inStock, setInStock] = React.useState(
    window.localStorage.getItem('inStock') || '',
  )

  function handleStockChange(e) {
    let stock = inStock
    e.target.checked
      ? (stock += e.target.id)
      : (stock = stock.replace(e.target.id, ''))
    setInStock(stock)
    window.localStorage.setItem('inStock', stock)
  }

  function handleStockSubmit(e) {
    e.preventDefault()
    const result = []
    for (let d in allDrinks) {
      if (allDrinks[d].ingredients.every((i) => inStock.includes(i))) {
        result.push(allDrinks[d])
      }
    }
    setCurrentDrinks(result)
  }

  return (
    <div>
      <h1>SC Drink Finder</h1>
      <SearchForm
        onNameChange={(e) => setCurrentDrinks(findDrinksByName(e.target.value))}
        onIngredientChange={(e) =>
          setCurrentDrinks(findDrinksByIngredient(e.target.value))
        }
      />
      <InStock
        onStockChange={handleStockChange}
        onStockSubmit={handleStockSubmit}
        inStock={inStock}
      />
      {console.log(
        allDrinks.filter(
          (d) =>
            d.ingredients.filter((i) => inStock.includes(i) === false)
              .length === 1,
        ),
      )}
      <DrinkList drinks={currentDrinks}/>
      <footer></footer>
    </div>
  )
}
