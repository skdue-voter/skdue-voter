// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Login page", () => {
  test("Test on display 3 icon and Voting System Text", async ({ page }) => {
    // Expect an module image icon to be visible
    await expect.soft(page.locator('img[alt="logoSkdue"]')).toBeVisible();
    await expect.soft(page.locator('img[alt="logoSankasaint"]')).toBeVisible();
    await expect.soft(page.locator('img[alt="logoCatnip"]')).toBeVisible();

    // Expect a page to contain a Voting System text
    await expect.soft(page.locator("text=Voting System")).toBeVisible();
  });

  test("Test on invalid login", async ({ page }) => {
    // vertify invalid citizen ID or CVV alert
    page.on("dialog", async (dialog) => {
      // Verify type of dialog
      expect.soft(dialog.type()).toContain("alert");
      // verify message of alert
      expect
        .soft(dialog.message())
        .toContain("Citizen not found. Wrong citizen ID or CVV");
      //click on alert ok button
      await dialog.accept();
    });

    // Type into the citizenID and CVV field
    await page.locator("[name=username]").type("12345");
    await page.locator("[name=password]").type("12345");

    // Press Enter on Login button
    await page.getByText("Login").press("Enter");
  });

  test("Test on valid login", async ({ page }) => {

    // Type into the citizenID and CVV field
    await page.locator("[name=username]").type("579337567744");
    await page.locator("[name=password]").type("BV2-2703382-60");

    const [response] = await Promise.all([
      // Waits for the main frame navigation and returns the main resource response
      page.waitForNavigation({url: 'http://localhost:3000/home'}),
      // Press Enter on Login form
      page.getByText("Login").press("Enter"),
    ]);
  });
});