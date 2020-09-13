import allDrinks from '../data/all_drinks'

export function findDrinksByName(searchTerm) {
  if (!searchTerm) return
  return allDrinks.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
}

export function drinkHasIngredient(drink, ingredient) {
  return drink.ingredients.some((i) => i.includes(ingredient.toLowerCase()))
}

export function findDrinksByIngredient(searchTerm) {
  if (!searchTerm) return
  return allDrinks.filter((d) => drinkHasIngredient(d, searchTerm))
}
