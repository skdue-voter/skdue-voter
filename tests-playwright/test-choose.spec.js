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

    await page.waitForLoadState('networkidle');

    while (true) {
        if ((await page.locator(':text("First Name") + p').textContent()) != "") {
          break;
        }
    }

    page.on('dialog', dialog => {
        dialog.accept();
      });
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
        expect.soft(firstPending).toEqual("Vote pending")

        const secondPending = await page.locator(':text("Vote Party") + button + p').textContent();
        expect.soft(secondPending).toEqual("Vote pending")
    });

    
    test("After vote for candidate and party list", async ({ page }) => {
        await page.locator(':text("Vote Candidate") + button').click();
        expect.soft(await page.url()).toEqual(baseUrl + "/vote-candidate");

        // choose candidate
        await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[1]/button').click();
        await page.waitForLoadState('networkidle');
        await page.waitForLoadState('domcontentloaded');
        const candidateName = await page.locator('//*[@id="__next"]/div/div/div[2]/div[2]/div/p[1]').textContent();
        // console.log(candidateName);
        await page.locator('//*[@id="__next"]/div/div/div[2]/div[2]/button').click();

        // choose party
        expect.soft(await page.url()).toEqual(baseUrl + "/vote-party")
        await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[1]/button').click();
        await page.waitForLoadState('networkidle');
        await page.waitForLoadState('domcontentloaded');
        const partyName = await page.locator('//*[@id="__next"]/div/div/div[2]/div[2]/div/p').textContent();
        // console.log(partyName);
        await page.locator('//*[@id="__next"]/div/div/div[2]/div[2]/button').click();

        // console.log(await page.url());

        while (true) {
            if ((await page.locator(':text("First Name") + p').textContent()) != "") {
              break;
            }
        }

        // voting status
        expect.soft(await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[1]/div/p[2]').textContent()).toEqual(`Voting for ${candidateName}`);
        expect.soft(await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[2]/div/p[2]').textContent()).toEqual(`Voting for ${partyName}`);

        // change in button
        expect.soft(await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[1]/div/button[1]').textContent()).toEqual('Change');
        expect.soft(await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[2]/div/button[1]').textContent()).toEqual('Change');

        // vote confirmation
        expect.soft(await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[3]/p').textContent()).toEqual('Please confirm your vote');
        expect.soft(await page.locator('//*[@id="__next"]/div/div/div[2]/div[1]/div[3]/div/button').textContent()).toEqual('Confirm Vote');
    });


    test("After vote for only candidate", async ({ page }) => {
    
    });

    test("After vote for only party", async ({ page }) => {

    });
})