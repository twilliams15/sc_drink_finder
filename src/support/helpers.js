import allDrinks from '../data/all_drinks'

export function getAvailableDrinks(stock) {
    return allDrinks.filter(drink =>
        drink.ingredients.every(i => stock.includes(i))
    )
}

export function findDrinksByName(searchTerm) {
    if (!searchTerm) return
    return allDrinks.filter(drink =>
        drink.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
}

export function drinkHasIngredient(drink, ingredient) {
    return drink.ingredients.some(i => i.includes(ingredient.toLowerCase()))
}

export function findDrinksByIngredient(searchTerm) {
    if (!searchTerm) return
    return allDrinks.filter(drink => drinkHasIngredient(drink, searchTerm))
}

export function getMissingIngredients(drink, inStock) {
    return drink.ingredients.filter(i => inStock.includes(i) === false)
}

export function findDrinksMissingOneIngredient(inStock) {
    return allDrinks.filter(
        drink => getMissingIngredients(drink, inStock).length === 1
    )
}

export function mostCommonMissingIngredient(inStock) {
    return findDrinksMissingOneIngredient(inStock)
        .map(drink => getMissingIngredients(drink, inStock))
        .flat()
        .reduce(
            (a, b, i, arr) =>
                arr.filter(v => v === a).length >=
                arr.filter(v => v === b).length
                    ? a
                    : b,
            ''
        )
}

export function countDrinksMissingIngredient(ingredient, inStock) {
    return findDrinksMissingOneIngredient(inStock).filter(drink =>
        drinkHasIngredient(drink, ingredient)
    ).length
}

export function countDrinksMissingMostCommonIngredient(inStock) {
    return countDrinksMissingIngredient(
        mostCommonMissingIngredient(inStock),
        inStock
    )
}
