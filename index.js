'use strict';

const puppeteer = require('puppeteer-core');

const host = 'my-cluster.cloud.aerokube.com';
const username = 'test';
const password = 'test-password';

(async () => {
    const devtools = await puppeteer.connect(
        { timeout: 0, browserWSEndpoint: `ws://${username}:${password}@${host}/devtools/chrome/97.0?headless=false&enableVideo=true&videoName=testfile.mp4` }
    );
    const page = await devtools.newPage();
    await page.goto('https://aerokube.com');
    await page.screenshot({path: 'screenshot.png'});

    const title = await page.title();
    console.log(title);

    await devtools.close();
})();
