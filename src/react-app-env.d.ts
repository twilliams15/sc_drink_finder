/// <reference types="react-scripts" />

export type Cocktail = {
    name: string
    page: number
    ingredients: string[]
}

export type IngredientList = {
    [key: string]: {[key: string]: string}
}

export type Rum = {
    name: string
    origin: string
}

export type RumTypeList = {
    name: string
    rums: Rum[]
}

export type RumClassList = {
    class: string
    types: RumTypeList[]
}
