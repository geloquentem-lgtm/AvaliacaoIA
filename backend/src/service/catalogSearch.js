export function normalizeSearch(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
}

export function filterProducts(products, { categoryId, search }) {
    const normalizedSearch = normalizeSearch(search.trim())
    return products.filter((product) => {
        const matchesCategory = !categoryId || product.categoryId === categoryId
        const searchableText = normalizeSearch(`${product.name} ${product.description}`)
        return matchesCategory && searchableText.includes(normalizedSearch)
    })
}
