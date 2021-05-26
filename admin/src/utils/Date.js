exports.conciseDate = date => {
    let dateObj = new Date(date);
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    return year + `-${month}-${day}`;
}

exports.addDays = (date, days) => {
    return new Date(new Date(date).getTime() + days * 24 * 60 * 60 * 1000)
}