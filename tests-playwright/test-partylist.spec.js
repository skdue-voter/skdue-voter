// @ts-check
const { test, expect } = require("@playwright/test");
const { default: axios, Axios } = require("axios");

let api_url = "https://sankasaint.helloyeew.dev/api/party"
let path_url = "http://localhost:3000/party-list"

test.beforeEach(async ({ page }) => {
  await page.goto(path_url);
});

test.describe("Party-list Page", () => {
  test("Check first number name in api", async ({ page }) => {
    await expect(page.getByText("Party")).toBeVisible();
    await expect(page.getByText("Back")).toBeVisible();

    let name = (await page.locator(`//*[@id="__next"]/div/div/div[2]/div[5]/div[1]/p`).textContent()) || "FUCK";
    console.log(name);

    await page.goto(api_url);
    let count = await page.getByText(name).count();
    await expect(count).toBeGreaterThan(0);
  });

   test("Check last number exist", async ({ page }) => {
     let i = 1;
     while (true) {
       let num = i.toString();

       console.log(
        num,
        await page
          .locator(`//*[@id="__next"]/div/div/div[2]/div[5]/div[1]`)
          .textContent()
       );

       if ((await page.locator(`span`, { hasText: num }).isVisible()) == false) {
         i -= 1;
         break;
       }
       await page.locator(`span`, { hasText: num }).click();
       i += 1;
     }

     console.log("last id is ", i);

     await page.goto(api_url);
     let count1 = await page.getByText(i.toString()).count();
     await expect(count1).toBeGreaterThan(0);
   });

  test("Check select description", async ({ page }) => {
    await page.locator(`[name='main']`).click();

    let desc = (await page.locator(`[name='select-desc']`).textContent()) || "desc";
    console.log("desc is ", desc);

    await page.goto(api_url);
    let count1 = await page.getByText(desc).count();
    await expect(count1).toBeGreaterThan(0);
  });

  test("Check select quote", async ({ page }) => {
    await page.locator(`[name='main']`).click();

    let quote = (await page.locator(`[name='select-quote']`).textContent()) || "quote";
    console.log("quote is", quote);

    await page.goto(api_url);
    let count1 = await page.getByText(quote).count();
    await expect(count1).toBeGreaterThan(0);
  });

  test("Check select img", async ({ page }) => {
    await page.locator(`[name='main']`).click();
    let url = (await page.locator(`[name='select-img']`).getAttribute("src")) || "url";
    console.log("img's url is", url);

    await page.goto(api_url);
    let count1 = await page.getByText(url).count();
    await expect(count1).toBeGreaterThan(0);
    // await expect((await page.getByText(url).isVisible()) != false).toBe(true);
  });
});
