import allDrinks from '../data/all_drinks'

export function findDrinksByName(searchTerm) {
  if (!searchTerm) return
  return allDrinks.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export function drinkHasIngredient(drink, ingredient) {
  return drink.ingredients.some((i) => i.includes(ingredient.toLowerCase()))
}

export function findDrinksByIngredient(searchTerm) {
  if (!searchTerm) return
  return allDrinks.filter((d) => drinkHasIngredient(d, searchTerm))
}

export function getMissingIngredients(drink, inStock) {
  return drink.ingredients.filter((i) => inStock.includes(i) === false)
}

export function findDrinksMissingOneIngredient(inStock) {
  return allDrinks.filter((d) => getMissingIngredients(d, inStock).length === 1)
}

export function mostCommonMissingIngredient(inStock) {
  return findDrinksMissingOneIngredient(inStock)
    .map((d) => getMissingIngredients(d, inStock))
    .flat()
    .reduce(
      (a, b, i, arr) =>
        arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
          ? a
          : b,
      ''
    )
}

export function countDrinksMissingIngredient(ingredient, inStock) {
  return findDrinksMissingOneIngredient(inStock).filter((d) =>
    drinkHasIngredient(d, ingredient)
  ).length
}

export function countDrinksMissingMostCommonIngredient(inStock) {
  return countDrinksMissingIngredient(
    mostCommonMissingIngredient(inStock),
    inStock
  )
}
