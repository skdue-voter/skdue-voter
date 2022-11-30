// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/vote-result");
});

test.describe("Result Page", () => {
  test("Test on select Candidate", async ({ page }) => {
    // Expect candidate button to be visible
    await expect.soft(page.locator('//*[@id="__next"]/div/div/div[2]/button[1]')).toBeVisible();
    // Expect area select to be visible
    await expect.soft(page.locator('//*[@id="__next"]/div/div/div[3]/select')).toBeVisible();

    // get all candidate name in web page
    let name = (await page.locator(`//*[@id="__next"]/div/div/div[4]/div[1]/div/p`).textContent()) || "null";
    name = name.replace(/[0-9]/g, "");
    name = name.split(" ")[0];

    // check candidate name in backend
    await page.goto("https://sankasaint.helloyeew.dev/api/election/latest/result/area/1");
    let count = await page.getByText(name).count();
    await expect(count).toBeGreaterThan(0);

  });

  test("Test on select Party", async ({ page }) => {
    // Expect party button to be visible
    await expect.soft(page.locator('//*[@id="__next"]/div/div/div[2]/button[2]')).toBeVisible();
    page.locator('//*[@id="__next"]/div/div/div[2]/button[2]').click();
    // Expect area select to be empty
    await expect.soft(page.locator('//*[@id="__next"]/div/div/div[3]/select')).toBeEmpty();

    // get all party name in web page
    let name = (await page.locator(`//*[@id="__next"]/div/div/div[3]/div[1]/div/p[1]`).textContent()) || "null";
    name = name.replace(/[0-9]/g, "");
    name = name.split(" ")[0];

    // check party name in backend
    await page.goto("https://sankasaint.helloyeew.dev/api/election/latest/result/party");
    let count = await page.getByText(name).count();
    await expect(count).toBeGreaterThan(0);
  });
});