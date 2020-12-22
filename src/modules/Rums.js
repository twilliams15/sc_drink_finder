import React from 'react'
import allRums from '../data/all_rums'

export function Rums() {
  function rumListElement(rumList) {
    return (
      <>
        <h2>{rumList.class}</h2>
        {rumList.types.map(rumTypesElement)}
      </>
    )
  }

  function rumTypesElement(rumType) {
    return (
      <>
        <h3>{rumType.name}</h3>
        {rumType.rums.map(rumElement)}
      </>
    )
  }

  function rumElement(rum) {
    return (
      <li>
        {rum.name}
        <br />
        <span className="origin">{rum.origin}</span>
        <br />
        <br />
      </li>
    )
  }

  return (
    <div id="rums">
      {allRums.map(rumListElement)}
    </div>
  )
}
