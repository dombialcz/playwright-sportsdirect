import * as assert from "assert";
import { chromium } from "playwright";

let page: any;
let browser: any;


describe("Sportsdirect", () => {
    beforeAll(async () => {
      browser = process.env.GITHUB_ACTIONS
        ? await chromium.launch()
        : await chromium.launch({ headless: false });
      page = await browser.newPage();
  
      await page
        .goto("https://lv.sportsdirect.com/", {
          waitUntil: "networkidle0",
        })
        // tslint:disable-next-line:no-empty
        .catch(() => {});
    });
  
    afterAll(() => {
      if (!page.isClosed()) {
        browser.close();
      }
    });
  
    test("Should be on the sportsdirect main page", async () => {
      await page.waitForSelector("h2");
      const title = await page.$eval(
        "h2",
        (el: { textContent: any }) => el.textContent
      );
      assert.strictEqual(await page.title(), "SportsDirect.com – The UK’s No 1 Sports Retailer");
      assert.strictEqual(title, "TOP SNEAKERS");
    });
    /



  test("should search for super shoes and add to cart", async () => {

    try {
      await page.waitForSelector('button[data-dismiss="modal"]', { timeout: 5000 })
      await page.locator('button[data-dismiss="modal"]').first().click();
    } catch (error) {
      console.log("Modal to change language wasn't showed, you are probably viewing https://lv.sportsdirect.com/ from Latvia")
    }

    await page.waitForSelector('#txtSearch');
    await page.fill('#txtSearch', 'Super Shoes');
    await page.keyboard.press("Enter");
    await page.waitForSelector("text='Response Super Mens Training Shoes'");
    await page.locator("text='Response Super Mens Training Shoes'").click();

    // select size
    await page.locator("#liItem").first().click();
    await page.locator("#aAddToBag").click();


    await page.hover("#bagQuantity");
    await page.waitForSelector("#aViewBag"); // in case modal disappears, bring it back by hover
    await page.locator("#aViewBag").click();


    await page.waitForSelector("#BasketHeaderText");
    const headerText = await page.$eval(
      "#BasketHeaderText",
      (el: { textContent: any }) => el.textContent
    );
    
    assert.strictEqual(headerText, "MY BAG");

    const itemInBag = await page.$eval(
      "#dhypProductLink",
      (el: { textContent: any }) => el.textContent
    );
    
    assert.strictEqual(itemInBag.trim(), "adidas Response Super Mens Training Shoes");

  });


  });