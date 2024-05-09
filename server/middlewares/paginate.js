const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

module.exports.getPagination = function (page, limit, search, sort) {
    const pageNumber = parseInt(page) || DEFAULT_PAGE
    const pageSize = parseInt(limit) || DEFAULT_PAGE_SIZE
    const skip = pageNumber - 1 * pageSize
    const searched = search || ''
    const sorted = sort || 'price'

    return {
        skip,
        sorted,
        pageSize,
        searched,
    }
}
