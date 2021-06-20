import {allDrinks} from '../data/all_drinks'
import {Cocktail} from '../react-app-env'

export function getAvailableDrinks(stock: string[]) {
    return allDrinks.filter(drink =>
        drink.ingredients.every(i => stock.includes(i))
    )
}

export function findDrinksByName(searchTerm: string) {
    if (!searchTerm) return []
    return allDrinks.filter(drink =>
        drink.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
}

export function drinkHasIngredient(drink: Cocktail, ingredient: string) {
    return drink.ingredients.some(i => i.includes(ingredient.toLowerCase()))
}

export function findDrinksByIngredient(searchTerm: string) {
    if (!searchTerm) return []
    return allDrinks.filter(drink => drinkHasIngredient(drink, searchTerm))
}

export function getMissingIngredients(drink: Cocktail, inStock: string[]) {
    return drink.ingredients.filter(i => !inStock.includes(hyphenate(i)))
}

export function findDrinksMissingOneIngredient(inStock: string[]) {
    return allDrinks.filter(
        drink => getMissingIngredients(drink, inStock).length === 1
    )
}

export function mostCommonMissingIngredient(inStock: string[]) {
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

export function countDrinksMissingIngredient(
    ingredient: string,
    inStock: string[]
) {
    return findDrinksMissingOneIngredient(inStock).filter(drink =>
        drinkHasIngredient(drink, ingredient)
    ).length
}

export function countDrinksMissingMostCommonIngredient(inStock: string[]) {
    return countDrinksMissingIngredient(
        mostCommonMissingIngredient(inStock),
        inStock
    )
}

export function hyphenate(text: string) {
    return text.split(' ').join('-')
}
