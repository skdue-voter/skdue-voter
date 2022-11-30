// @ts-check
const { test, expect } = require("@playwright/test");
const { default: axios, Axios } = require("axios");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/candidate");
});

test.describe("Candidate Page", () => {
  test("Check first number name in api", async ({ page }) => {
    await expect(page.getByText("Candidate")).toBeVisible();
    await expect(page.getByText("Back")).toBeVisible();

    let name = (await page.locator(`[name='main']`).textContent()) || "FUCK";
    name = name.replace(/[0-9]/g, "");
    name = name.split(" ")[0];
    console.log(name);

    await page.goto("https://sankasaint.helloyeew.dev/api/candidate");
    let count = await page.getByText(name).count();
    await expect(count).toBeGreaterThan(0);
  });

  test("Check last number exist", async ({ page }) => {
    let i = 1;
    while (true) {
      let num = i.toString();
      //*[@id="__next"]/div/div/div[2]/div[5]/div[1]
      console.log(
        num,
        await page
          .locator(`//*[@id="__next"]/div/div/div[2]/div[5]/div[1]`)
          .textContent()
      );
      // if ((await page.locator(`span`, { hasText: num }).isVisible()) == false) {
      //   i -= 1;
      //   break;
      // }
      // await page.locator(`span`, { hasText: num }).click();
      // i += 1;
      if ((await page.locator(`span`, { hasText: num }).isVisible()) == false) {
        i -= 1;
        break;
      }
      await page.locator(`span`, { hasText: num }).click();
      i += 1;
    }

    console.log("last id is ", i);

    await page.goto("https://sankasaint.helloyeew.dev/api/candidate");
    let count1 = await page.getByText(i.toString()).count();
    await expect(count1).toBeGreaterThan(0);
  });

  test("Check select description", async ({ page }) => {
    await page.locator(`[name='main']`).click();

    let desc =
      (await page.locator(`[name='select-desc']`).textContent()) || "desc";
    console.log("desc is ", desc);

    await page.goto("https://sankasaint.helloyeew.dev/api/candidate");
    let count1 = await page.getByText(desc).count();
    await expect(count1).toBeGreaterThan(0);
  });

  test("Check select img", async ({ page }) => {
    await page.locator(`[name='main']`).click();
    let url =
      (await page.locator(`[name='select-img']`).getAttribute("src")) || "url";
    console.log("img's url is", url);

    await page.goto("https://sankasaint.helloyeew.dev/api/candidate");
    let count1 = await page.getByText(url).count();
    await expect(count1).toBeGreaterThan(0);
    // await expect((await page.getByText(url).isVisible()) != false).toBe(true);
  });
});
