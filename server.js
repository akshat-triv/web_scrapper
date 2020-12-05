const puppeteer = require("puppeteer");
const htmltotext = require("html-to-text");
const fs = require("fs");

const data = [];
let browser;

async function scrap(link) {
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(link);
    const html = await response.text();
    let title = await page.evaluate(
      () => document.querySelector("title").textContent
    );
    let text = htmltotext.fromString(html);
    let tmp = { title, text };
    data.push(tmp);
  } catch (err) {
    console.log(err.message);
  }
}

async function callScrap() {
  try {
    await scrap(
      "https://www.akshattrivedi.tk/article/introduction-to-front-end-development-or-what-is-html-and-css"
    );
    await browser.close();
    await scrap(
      "https://www.akshattrivedi.tk/article/how-i-got-my-first-internship-as-a-node-js-developer"
    );
    await browser.close();
    //Just repeat these steps for multiple links
    //  await scrap(
    //    "Next link - remember links should start with https://"
    //  );
    //  await browser.close();
    //Don't try looping it will throw error

    fs.writeFileSync("./dataOut.json", JSON.stringify(data));
  } catch (err) {
    console.log(err.message);
  }
}

(async () => {
  await callScrap();
  console.log("Data written! Thank You");
})();
