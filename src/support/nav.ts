function show(elementId: string) {
    // @ts-ignore
    document.getElementById(elementId).style.display = 'block'
}

function hide(elementId: string) {
    // @ts-ignore
    document.getElementById(elementId).style.display = 'none'
}

export default {
    displayInStock: () => {
        show('in-stock')
        show('drink-list')
        hide('search')
        hide('insights')
        hide('rums')
    },

    displaySearch: () => {
        show('search')
        show('drink-list')
        hide('in-stock')
        hide('insights')
        hide('rums')
    },

    displayInsights: () => {
        show('insights')
        show('drink-list')
        hide('search')
        hide('in-stock')
        hide('rums')
    },

    displayRums: () => {
        show('rums')
        hide('search')
        hide('in-stock')
        hide('insights')
        hide('drink-list')
    },
}
