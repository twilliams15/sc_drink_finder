import React from 'react'
import {
  countDrinksMissingMostCommonIngredient,
  mostCommonMissingIngredient,
} from '../support/helpers'

export function Insights({handleOneIngredientSubmit, inStock}) {
  return (
    <div id="insights">
      <button onClick={handleOneIngredientSubmit}>
        Find drinks missing 1 ingredient
      </button>
      {countDrinksMissingMostCommonIngredient(inStock) > 1 && (
        <p>
          With {mostCommonMissingIngredient(inStock)}, you could make{' '}
          {countDrinksMissingMostCommonIngredient(inStock)} more drinks!
        </p>
      )}
    </div>
  )
}
