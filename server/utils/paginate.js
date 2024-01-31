const paginate = (array, page_nr, page_limit) =>{
    const offset = page_nr * page_limit
    return array.slice(offset, page_limit + offset)
}

module.exports = {paginate}