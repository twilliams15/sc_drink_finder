import React from 'react'
import allIngredients from '../data/all_ingredients'

export function InStock({onStockChange, inStock}) {
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
    <form id="in-stock">
      <p className="accordion" onClick={toggleAccordion}>
        <strong>
          In stock <em>({symbol})</em>
        </strong>
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
      <p>With what you have in stock...</p>
    </form>
  )
}
