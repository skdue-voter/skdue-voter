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

    await page.goto('http://localhost:3000/vote-candidate')
});

test.describe("Vote Candidate page",() => {
    test("Check text on page", async ({ page }) => {
        await expect(page.getByText("Candidate Election")).toBeVisible();
        await expect(page.getByText("Back")).toBeVisible();   
        await expect(page.getByText("Please select candidate to vote")).toBeVisible();  
        await expect(page.getByText("Confirm")).toBeVisible();  

        let candidate = (await page.goto(`https://sankasaint.helloyeew.dev/api/area/3`));
        let candidatList =  "username"
        let count = await page.getByText(candidatList).count();
        await expect(count).toBeGreaterThan(0);
    });

    test("Check candidate buttons", async ({page}) => {
        let i = 1;
        let candidatList = ["11", "12", "13", "14", "15"]
        while (true) {
            let id = await page.locator(`//*[@id="__next"]/div/div/div[2]/div[1]/div[${i}]/button`).textContent()
            await expect(id).toEqual(candidatList[i-1])
            if (i == 5){
                break;
            }
            i += 1;
        }
    });

    test("Ckeck select candidate button", async ({ page }) => {
        let i = 1;
        let candidatList = ["Kamisato Ayaka Irido", "Sayu Irido", "Raiden Shogun Irido", "Yoimiya Irido", "Sangonomiya Kokomi Irido"]
        while (true) {
            let candidate = await page.locator(`//*[@id="__next"]/div/div/div[2]/div[1]/div[${i}]/button`).click();
            await expect(page.getByText(candidatList[i-1])).toBeVisible(); 
            if (i == 5){
                break;
            }
            i += 1;
        }
    });

    test("Ckeck trigger confirm select candidate", async ({ page }) => {
        let candidate = await page.locator(`//*[@id="__next"]/div/div/div[2]/div[1]/div[1]/button`).click();
        await page.locator(`//*[@id="__next"]/div/div/div[2]/div[2]/button`).click();
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toContain(`Voting for 11?`)
            await dialog.accept();
        })
    })
});