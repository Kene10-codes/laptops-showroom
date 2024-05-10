const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 5

module.exports.getPagination = function (page, limit, search, sort) {
    const pageNumber = parseInt(page) || DEFAULT_PAGE
    const limitSize = parseInt(limit) || DEFAULT_PAGE_SIZE
    const skip = pageNumber - 1 * limit
    const searched = search || ''
    const sorted = sort || 'price'

    return {
        skip,
        sorted,
        limitSize,
        searched,
    }
}
