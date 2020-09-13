import allDrinks from "../data/all_drinks";

export function findDrinksByName(searchTerm) {
  if (!searchTerm) return;
  return allDrinks.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function drinkHasIngredient(drink, ingredient) {
  return drink.ingredients
    .map((i) => i.toLowerCase().includes(ingredient.toLowerCase()))
    .includes(true);
}

export function findDrinksByIngredient(searchTerm) {
  if (!searchTerm) return;
  return allDrinks.filter((d) =>
    d.ingredients.some((i) => i.includes(searchTerm.toLowerCase()))
  );
}
