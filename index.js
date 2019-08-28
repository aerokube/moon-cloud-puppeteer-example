'use strict';

const { remote } = require('webdriverio');
const puppeteer = require('puppeteer-core');
const host = 'browsers.aerokube.com';
(async () => {
    const browser = await remote({
        protocol: 'https',
        hostname: host,
        user: 'your-username-here',
        key: 'your-password-here',
        port: 4444,
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome',
            browserVersion: '76.0'
        }
    });

    const devtools = await puppeteer.connect(
        { browserWSEndpoint: `wss://${host}:4444/devtools/${browser.sessionId}/` }
    );
    const page = await devtools.newPage();
    await page.goto('http://duckduckgo.com');
    await page.screenshot({path: 'screenshot.png'});
    const title = await page.title();

    console.log(title);

    await devtools.close();
    await browser.deleteSession();

})().catch((e) => console.error(e));
