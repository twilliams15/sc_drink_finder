import React from 'react'
import './styles.css'
import allDrinks from './data/all_drinks'
import {
  findDrinksByIngredient,
  findDrinksByName,
  findDrinksMissingOneIngredient,
} from './support/helpers'
import {SearchForm} from './modules/SearchForm'
import {InStock} from './modules/InStock'
import {DrinkList} from './modules/DrinkList'
import {Insights} from './modules/Insights'

export default function App() {
  const [inStock, setInStock] = React.useState(
    window.localStorage.getItem('inStock') || ''
  )
  const [currentDrinks, setCurrentDrinks] = React.useState(
    getCurrentDrinks(inStock)
  )

  function getCurrentDrinks(inStock) {
    return allDrinks.filter((d) =>
      d.ingredients.every((i) => inStock.includes(i))
    )
  }

  function handleStockChange(e) {
    let stock = inStock
    e.target.checked
      ? (stock += e.target.id)
      : (stock = stock.replace(e.target.id, ''))
    setInStock(stock)
    setCurrentDrinks(getCurrentDrinks(stock))
    window.localStorage.setItem('inStock', stock)
  }

  function handleOneIngredientSubmit() {
    setCurrentDrinks(findDrinksMissingOneIngredient(inStock))
  }

  function displayInStock() {}

  function displaySearch() {}

  function displayInsights() {}

  function displayShopping() {}

  return (
    <div>
      <h1>SC Drink Finder</h1>
      <nav>
        <ul>
          <li onClick={displayInStock}>In Stock</li>
          <li onClick={displaySearch}>Search</li>
          <li onClick={displayInsights}>Insights</li>
          <li onClick={displayShopping}>Shopping</li>
        </ul>
      </nav>
      <InStock onStockChange={handleStockChange} inStock={inStock} />
      <SearchForm
        onNameChange={(e) => setCurrentDrinks(findDrinksByName(e.target.value))}
        onIngredientChange={(e) =>
          setCurrentDrinks(findDrinksByIngredient(e.target.value))
        }
      />
      <Insights
        handleOneIngredientSubmit={handleOneIngredientSubmit}
        inStock={inStock}
      />
      <DrinkList drinks={currentDrinks} inStock={inStock} />
      <footer>* missing ingredient</footer>
    </div>
  )
}
