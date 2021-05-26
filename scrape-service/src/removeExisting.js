const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const removeExisting = async (urls, images, highlights, summary) => {
    try {
        let existingUrls = [];
        
        let data = await readFile('./urls.log', 'utf-8')
        existingUrls = data.split("\n");
        if (existingUrls) {
            let existingIndex = [];
            urls.forEach((url, index) => {
                if (existingUrls.indexOf(url) > -1) {
                    existingIndex.push(index);
                }
            });
            existingIndex.reverse().forEach((urlIndex) => {
                urls.splice(urlIndex, 1);
                images.splice(urlIndex, 1);
                highlights.splice(urlIndex, 1);
                summary.splice(urlIndex, 1);
            });
        }
    }
    catch (err) {
        console.log(err);
    }
    
}

module.exports = removeExisting;