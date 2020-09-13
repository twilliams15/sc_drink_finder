import React from 'react'
import allIngredients from '../data/all_ingredients'

export function InStock({onStockChange, onStockSubmit, inStock}) {
  const [symbol, setSymbol] = React.useState('+')

  function toggleAccordion() {
    symbol === '+' ? setSymbol('–') : setSymbol('+')
    const stockItems = document.getElementsByClassName('stock')
    ;[...stockItems].forEach((i) =>
      i.style.display === 'block'
        ? (i.style.display = 'none')
        : (i.style.display = 'block')
    )
  }

  return (
    <form id="in-stock" onSubmit={onStockSubmit}>
      <p className="accordion" onClick={toggleAccordion}>
        In stock <em>({symbol})</em>
      </p>
      {[...Object.keys(allIngredients)].sort().map((c) => (
        <ul key={c} className="stock">
          {c}
          {[...Object.keys(allIngredients[c])].sort().map((i) => {
            return (
              <li key={allIngredients[c][i]} className="stock">
                <input
                  id={allIngredients[c][i]}
                  type="checkbox"
                  onChange={onStockChange}
                  checked={inStock.includes(allIngredients[c][i])}
                />
                <label htmlFor={allIngredients[c][i]}>
                  {allIngredients[c][i]}
                </label>
              </li>
            )
          })}
        </ul>
      ))}
      <button type="submit">Search by stock</button>
    </form>
  )
}
