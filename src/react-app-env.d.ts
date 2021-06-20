/// <reference types="react-scripts" />

import React from 'react'

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

export type SearchFormProps = {
    onNameChange: React.ChangeEventHandler<HTMLInputElement>
    onIngredientChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    >
}
