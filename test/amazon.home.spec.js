const { home_page } = require('../utils');

describe('Amazon home test', () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 1520, height:1080});
    await page.goto(home_page);
  });

  afterEach(async () => {
    await page.close();
  });

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Amazon.com.br: compre celulares, TVs, computadores, livros, eBooks, e-readers Kindle e mais');
  });

  it('should have products slideshow', async function () {
    expect(await page.$$('#desktop-banner')).to.have.lengthOf(1);
  });

  it('should have one signin form after click on nav link', async function () {
    await page.click('#nav-link-accountList');
    await page.waitForSelector('form[name="signIn"]');
  
    expect(await page.$$('form[name="signIn"]')).to.have.lengthOf(1);
  });

});