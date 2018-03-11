const { login_page, valid_email, valid_password } = require('../utils');

describe('Amazon login test', () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 1520, height:1080});
    await page.goto(login_page);
  });

  afterEach(async () => {
    await page.close();
  });

  it('should get an error if email is invalid', async function () {
    await page.waitForSelector('form[name="signIn"]');
    await page.type('#ap_email', 'dsfasfsadf');
    await page.click('#continue');
    await page.waitForSelector('#auth-error-message-box');
  
    const errorTitle = await page.$eval('#auth-error-message-box .a-alert-heading', el => el.innerText);
  
    expect(errorTitle).to.eql('Houve um problema');
    expect(await page.$$('#auth-error-message-box')).to.have.lengthOf(1);
  });

  it('should login with valid credentials', async function () {
    await page.waitForSelector('form[name="signIn"]');
    await page.type('#ap_email', valid_email);
    await page.click('#continue');
    await page.waitForSelector('form[name="signIn"]');
    await page.type('#ap_password', valid_password);
    await page.click('#signInSubmit');
  
    await page.waitForSelector('#nav-link-accountList');
  
    const cookies = await page.cookies();
    const sessionCookie = cookies.find(cookie => cookie.name === 'session-token')
    expect(sessionCookie).to.be.an('object');
    
    const loggedNavText = await page.$eval('#nav-link-accountList .nav-line-1', el => el.innerText);
    expect(loggedNavText).to.eql('Olá, Gabriel');
  });

});