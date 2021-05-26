const fs = require('fs');

const addURL = (url) => {
    fs.appendFileSync('./urls.log', '\n' + url);
}

module.exports = addURL;