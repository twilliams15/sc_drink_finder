import React from 'react'
import allRums from '../data/all_rums'

export function Rums() {
  function toggleAccordion() {
    const rums = document.getElementsByClassName('rum')
    ;[...rums].forEach((r) =>
      r.style.display === 'block'
        ? (r.style.display = 'none')
        : (r.style.display = 'block')
    )
  }
  return (
    <div id="rums">
      {allRums.map((a) => (
        <>
          <h2>{a.class}</h2>
          {a.types.map((b) => (
            <>
              <ul onClick={toggleAccordion}>
                <strong>{b.type}</strong>
              </ul>
              {b.rums.map((c) => (
                <li className="rum">
                  {c.name} <br />
                  <span className="origin">{c.origin}</span>
                  <br />
                  <br />
                </li>
              ))}
            </>
          ))}
        </>
      ))}
    </div>
  )
}
