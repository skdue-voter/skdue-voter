// @ts-check
const { test, expect } = require("@playwright/test");
const { default: axios, Axios } = require("axios");

const baseUrl = "http://localhost:3000"
const user = "579337567744";
const pwd = "BV2-2703382-60"

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator("[name=username]").type(user);
    await page.locator("[name=password]").type(pwd);

    await Promise.all([
        // set up before click
        page.waitForNavigation({url: baseUrl+"/home"}),
        // login
        page.getByText("Login").click()
    ])

    while(true) {
        if (await page.locator(':text("First Name") + p').textContent() != "") {
            break;
        }
    }

    await page.goto('http://localhost:3000/vote-party')
});

test.describe("Party Candidate page",() => {
    test("Check text on page", async ({ page }) => {
        await expect(page.getByText("Party Election")).toBeVisible();
        await expect(page.getByText("Back")).toBeVisible();   
        await expect(page.getByText("Please select party to vote")).toBeVisible();  
        await expect(page.getByText("Confirm")).toBeVisible();  

        let candidate = (await page.goto(`https://sankasaint.helloyeew.dev/api/party`));
        let candidatList =  "name"
        let count = await page.getByText(candidatList).count();
        await expect(count).toBeGreaterThan(0);
    });

    test("Check party buttons", async ({page}) => {
        let i = 1;
        let candidatList = ["1", "2", "3", "4"]
        while (true) {
            let id = await page.locator(`//*[@id="__next"]/div/div/div[2]/div[1]/div[${i}]/button`).textContent()
            await expect(id).toEqual(candidatList[i-1])
            if (i == 4){
                break;
            }
            i += 1;
        }
    });

    test("Ckeck select party button", async ({ page }) => {
        let i = 1;
        let candidatList = ["We love Lumine", "แก๊งของเอ๋", "BLÅHAJ บลัวฮัย", "น้องภพสุดจ๊าบ"]
        while (true) {
            let candidate = await page.locator(`//*[@id="__next"]/div/div/div[2]/div[1]/div[${i}]/button`).click();
            await expect(page.getByText(candidatList[i-1])).toBeVisible(); 
            if (i == 4){
                break;
            }
            i += 1;
        }
    });

    test("Ckeck trigger confirm select party", async ({ page }) => {
        let candidate = await page.locator(`//*[@id="__next"]/div/div/div[2]/div[1]/div[1]/button`).click();
        await page.locator(`//*[@id="__next"]/div/div/div[2]/div[2]/button`).click();
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toContain(`Voting for We love Lumine?`)
            await dialog.accept();
        })
    })
});