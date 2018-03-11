const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

const opts = {
  headless: false,
  slowMo: 30,
  timeout: 20000,
  args: [
    '--start-maximized',
  ],
};

before (async () => {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

after (() => {
  browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});
