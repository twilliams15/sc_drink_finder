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

  function onOneIngredientSubmit() {
    setCurrentDrinks(findDrinksMissingOneIngredient(inStock))
  }

  function displayInStock() {
    document.getElementById('in-stock').style.display = 'block'
    ;[
      document.getElementById('search'),
      document.getElementById('insights'),
    ].forEach((m) => {
      m.style.display = 'none'
    })
    setCurrentDrinks(getCurrentDrinks(inStock))
  }

  function displaySearch() {
    document.getElementById('search').style.display = 'block'
    ;[
      document.getElementById('in-stock'),
      document.getElementById('insights'),
    ].forEach((m) => {
      m.style.display = 'none'
    })
    setCurrentDrinks([])
  }

  function displayInsights() {
    document.getElementById('insights').style.display = 'block'
    ;[
      document.getElementById('search'),
      document.getElementById('in-stock'),
    ].forEach((m) => {
      m.style.display = 'none'
    })
    setCurrentDrinks(findDrinksMissingOneIngredient(inStock))
  }

  return (
    <div>
      <h1>SC Drink Finder</h1>
      <nav>
        <ul>
          <li onClick={displayInStock}>In Stock</li>
          <li onClick={displaySearch}>Search</li>
          <li onClick={displayInsights}>Insights</li>
        </ul>
      </nav>
      <InStock
        onStockChange={handleStockChange}
        inStock={inStock}
        onOneIngredientSubmit={onOneIngredientSubmit}
      />
      <SearchForm
        onNameChange={(e) => setCurrentDrinks(findDrinksByName(e.target.value))}
        onIngredientChange={(e) =>
          setCurrentDrinks(findDrinksByIngredient(e.target.value))
        }
      />
      <Insights
        onOneIngredientSubmit={onOneIngredientSubmit}
        inStock={inStock}
      />
      <DrinkList drinks={currentDrinks} inStock={inStock} />
      <footer />
    </div>
  )
}
