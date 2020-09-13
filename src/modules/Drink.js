import React from 'react'

export function Drink({drink}) {
  return (
    <div className="drink">
      <h2>
        {drink.name}&nbsp;&nbsp;
        <span className="page">p.&nbsp;{drink.page}</span>
      </h2>
      <section className="ingredients">
        {drink.ingredients.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </section>
    </div>
  )
}
