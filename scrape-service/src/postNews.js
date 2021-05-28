const fetch = require('node-fetch');

const postNews = async (image, highlight, body, url) => {
    try {
        await fetch("https://obscure-ocean-64391.herokuapp.com/news", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                highlight,
                body,
                image,
                url
            })
        })
    }
    catch (err) {
        throw err;
    }
}

module.exports = postNews;