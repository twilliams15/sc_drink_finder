import React from 'react'

export function Drink({drink, inStock}) {
  console.log(inStock)
  return (
    <div className="drink">
      <h2>
        {drink.name}&nbsp;&nbsp;
        <span className="page">p.&nbsp;{drink.page}</span>
      </h2>
      <section className="ingredients">
        {drink.ingredients.map((o) => (
          <li key={o}>{inStock.includes(o) ? o : `${o} *`}</li>
        ))}
      </section>
    </div>
  )
}
