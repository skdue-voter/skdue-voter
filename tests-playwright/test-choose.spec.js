const { test, expect } = require("@playwright/test");

const baseUrl = "http://localhost:3000"

// test
const firstName = "Han";
const lastName = "Sikaeo";
const area = "Ban Mi"
const user = "579337567744";
const pwd = "BV2-2703382-60"

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator("[name=username]").type(user);
    await page.locator("[name=password]").type(pwd);
    // await page.getByText("Login").press("Enter");
    
    // await page.waitForNavigation({url: baseUrl+"/home"})
    await Promise.all([
        // set up before click
        page.waitForNavigation({url: baseUrl+"/home"}),
        // login
        page.getByText("Login").click()
    ])
});


test.describe("Chosen vote in home page for not voted user", () => {

    test("Navigate to home after login", async ({ page }) => {
        const url = await page.url();
        expect.soft(url).toEqual(baseUrl+'/home')
    });


    test("Show proper user infomation", async ({ page }) => {
        
        const fName = await page.locator(':text("First Name") + p').textContent();
        expect.soft(fName).toEqual(firstName);

        const lName = await page.locator(':text("Last Name") + p').textContent();
        expect.soft(lName).toEqual(lastName);

        const a = await page.locator(':text("Area") + p').textContent();
        expect.soft(a).toEqual(area);
    });


    test("Show two 'vote pending' status", async ({ page }) => {

        const firstPending = await page.locator(':text("Vote Candidate") + button + p').textContent();
        expect.soft(firstPending).toEqual("Vote Pending")

        const secondPending = await page.locator(':text("Vote Party") + button + p').textContent();
        expect.soft(secondPending).toEqual("Vote Pending")

    });

    
})