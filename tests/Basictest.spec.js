const {test,expect}=require('@playwright/test')

test('First Test',async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator("//*[@id='usertype']//following::span[3]").nth(0).click();
    const text=await page.locator('.modal-body p').textContent();
    await expect(text).toBe('You will be limited to only fewer functionalities of the app. Proceed?');
    await page.getByRole("button",{name:'Okay'}).click();
    await page.locator("[data-style='btn-info']").selectOption('Teacher');
    await page.locator("//*[@id='terms']").click();
    expect(await page.locator("//*[@id='terms']")).toBeChecked();
    await page.locator("//*[@id='signInBtn']").click();
    await page.locator(".card-title").first().textContent();
    const products=await page.locator(".card-title").allTextContents();
    for(let i=0;i<products.length;i++){
    await page.getByRole('button',{name:'Add'}).nth(i).click();
    await page.waitForTimeout(5000);
    }
    await page.locator("[class='nav-link btn btn-primary']").click();
    await page.locator("//*[@class='btn btn-success']").click();


})