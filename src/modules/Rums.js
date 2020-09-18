import React from 'react'
import allRums from '../data/all_rums'

export function Rums() {
  return (
    <div id="rums">
      {allRums.map((a) => (
        <>
          <h2>{a.class}</h2>
          {a.types.map((b) => (
            <>
              <ul>
                <strong>{b.type}</strong>
              </ul>
              {b.rums.map((c) => (
                <li>
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
