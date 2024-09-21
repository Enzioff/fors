export const getTotalElements = (paginationList: NodeListOf<Element>, listItems: NodeListOf<Element>): string => {
    return `${Array.from(paginationList).filter(el => el.classList.contains('active')).length}/${listItems.length}`
}