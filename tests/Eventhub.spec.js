const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  // await page.goto('https://eventhub.rahulshettyacademy.com/login');
  // await page.getByPlaceholder('you@email.com').fill('abhay@gmail.com');
  // await page.locator("//*[@id='password']").fill('Abcd12345@#');
  // await page.getByRole("button", { name: 'Sign In' }).click();

   await page.goto('https://www.playwrightautomation.com/practice.html?utm_source=chatgpt.com');

});

test('Create Event @smoke', async ({ page }) => {
  const eventName = "AR Rahaman Consent";
  await expect(page).toHaveURL(/eventhub/);
  await page.getByTestId('nav-events').click();
  await page.getByRole("button", { name: 'Add New Event' }).click();
  await expect(page.locator("//*[text()='+ New Event']")).toBeVisible();
  await page.getByTestId("event-title-input").fill(eventName);
  await page.getByPlaceholder("Describe the event…").fill("Abcdefff");
  await page.locator("//*[@id='category']").selectOption("Festival");
  await page.locator("//*[@id='city']").fill("Bangalore");
  await page.locator("//*[@id='venue']").fill("Backside ground");
  await page.locator("//*[@id='event-date-&-time']").fill("2026-10-27T14:30");
  await page.locator("//*[@id='price-($)']").fill("10.00");
  await page.locator("//*[@id='total-seats']").fill("500");
  await page.getByRole("button", { name: '+ Add Event' }).click();
  await page.getByTestId('nav-events').click();
  await page.pause();
  await expect(page.getByText(eventName)).toBeVisible();
});

test('Book Tiecket', async ({ page }) => {
  await page.locator("//*[text()='AR Rahaman Consent']//parent::a/following::div[4]/a").click();
});

test.only('frame', async ({ page }) => {
  
  const frame = await page.frameLocator("//*[@id='frame-payment-82']");
  await frame.locator("//*[@id='card-holder']").fill('Pavan');
  await page.locator("//*[@id='name']").fill('polo');
  await page.on('dialog', async dilog => {
  await dilog.accept();
  });
  await page.locator("//*[@id='btn-alert']").click();
  await page.pause();
});

test('dialog', async ({ page }) => {
page.on('dialog',async dilog=>{
await dialog.accept();
 });
 
});