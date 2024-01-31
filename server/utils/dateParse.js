const parseDateTime = (dateTime) => {
    let newDate = dateTime
    return newDate.replace('T', ' ') + ':00'
}


module.exports = {parseDateTime}