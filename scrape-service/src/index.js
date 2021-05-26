const puppeteer = require('puppeteer');
const removeExisting = require('./removeExisting');
const saveToLogs = require('./saveToLog');
const postNews = require('./postNews');
const cron = require('node-cron');

const scrape = async () => {
    console.log(":::::::START:::::::")
    let url = "https://www.footballpakistan.com/";
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
        let images = document.querySelectorAll('.wp-post-image');
        let headings = document.querySelectorAll(".cmsmasters_post_title > a");
        let summary = document.querySelectorAll(".cmsmasters_post_content > p");

        let imagesLinks = [], headingsBody = [], urls = [], summaryContent = [];

        for (let i = 0; i < images.length; i++) {
            imagesLinks.push(images[i].src);
            headingsBody.push(headings[i].innerHTML);
            summaryContent.push(summary[i].innerHTML);
            urls.push(headings[i].href);
        };

        return {
            imagesLinks,
            headingsBody,
            urls,
            summaryContent,
        }

    });
    
    await removeExisting(data.urls, data.imagesLinks, data.headingsBody, data.summaryContent);
    for (let i = 0; i < data.urls.length; i++) {
        await postNews(data.imagesLinks[i], data.headingsBody[i], data.summaryContent[i], data.urls[i]);
        saveToLogs(data.urls[i]);
    }
    console.log(":::::::DONE::::::::");
    browser.close();
}

cron.schedule('* * * * *', function () {
    scrape();
});

