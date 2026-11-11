const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {

    await page.goto('https://www.playwrightautomation.com/practice.html?utm_source=chatgpt.com');

});

test('Test Inputs', async ({ page }) => {
    await page.getByTestId('input-name').fill('input');
    await page.getByPlaceholder('Enter your email').fill('abc@gmail.com');
    await page.getByTestId('input-address').fill('poaposo');
    await page.getByTestId('btn-submit-text-inputs').click();
    await expect(page.getByTestId('text-inputs-status').first()).toHaveText('submitted');

});

test('Radio buttion', async ({ page }) => {
    await page.locator("//*[@id='gender-male']").click();
})

test('checkboxes', async ({ page }) => {
    await page.locator("//*[@id='day-select-all']").check();
    await expect(page.locator("//*[@id='day-select-all']")).toBeChecked();
    await page.locator("//*[@id='day-monday']").uncheck();
    await expect(page.locator("//*[@id='day-monday']")).not.toBeChecked();

});

test('Multiselects', async ({ page }) => {
    await page.getByText('Adidas').click({ modifiers: ['Control'] });
    await page.getByText('Zara').nth(1).click({ modifiers: ['Control'] });

});
test('dropdown', async ({ page }) => {
    await page.getByTestId("dropdown-country").selectOption('India');
    await page.getByTestId("dropdown-country").scrollIntoViewIfNeeded();
    await page.getByTestId("dropdown-country").selectOption({ label: 'Japan' });
    await page.getByTestId("dropdown-country").selectOption({ index: 2 });
    await page.locator("//*[@id='bd-job-title']/div/span[2]").click();
    await page.locator("//*[text()='Software Engineer']").click();
    await expect(page.locator("//*[@id='bd-job-title']/div/span[1]")).toHaveText('Software Engineer');
    const text = await page.locator("//*[@id='bd-selected-value']").textContent();
    await (expect(text)).toBe('Software Engineer');
});

test('FileUpload', async ({ page }) => {
    await page.locator("//*[@id='upload-single']").scrollIntoViewIfNeeded();
    await page.locator("//*[@id='upload-single']").setInputFiles("C:/Users/Happy/OneDrive/sfl/OneDrive/Pictures/Screenshots/Screenshot 2026-10-25 090734.png");
    await page.locator("//*[@id='upload-multiple']").setInputFiles(["C:/Users/Happy/OneDrive/sfl/OneDrive/Pictures/Screenshots/Screenshot 2026-10-25 090734.png", "C:/Users/Happy/OneDrive/sfl/OneDrive/Pictures/Screenshots/Screenshot (1).png"]);

})
test('file download', async ({ page }) => {
    const download = page.waitForEvent('download')
    await page.getByTestId("btn-download-svg").click();
    const download1 = await download;
    await download1.saveAs('C:/Users/Happy/Downloads/sample.pdf');
});

test('window new tab', async ({ page, context, browser }) => {
    const window = context.waitForEvent('page');
    await page.getByTestId('btn-open-pw-tab').click();
    const window1 = await window;
    await window1.waitForLoadState();
    console.log(await window1.title());
    const text = await window1.locator("//*[@class='installCode_lxde']").first().textContent();
    await expect(text).toBe('npm init playwright@latest');
    await expect(page.getByTestId('tab-count').first()).toHaveText('1');
    await browser.close();//it will close entire browser
    await window1.close()//close current tab
    //await page.bringToFront();
    await expect(page.getByTestId('tab-count').first()).toHaveText('0');
});

test('Open External Window', async ({ page }) => {
    const window = page.waitForEvent('popup');
    await page.getByTestId('btn-open-mw-window').click();
    const window1 = await window;
    await window1.waitForLoadState();
    console.log(window1.title());
    const text = await window1.locator("//*[@class='install-prompt']//parent::code").textContent();
    await expect(text).toContain('npm init mobilewright@latest');
    const count = await page.getByTestId('window-count').first().textContent();
    await expect(count).toBe('1');
    await window1.close();
});

test('2tabs in single browser', async ({ page }) => {
    const context = await page.context();
    const page1 = await context.newPage();
    await page1.goto('https://www.google.com');
   
})

test('2 different windows', async ({ page, browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto('https://www.google.com');
     // Switch to first tab
    await page.bringToFront();
})
test('frame and dialog', async ({ page }) => {
  
  const frame = await page.frameLocator("//*[@id='frame-payment-82']");
  await frame.locator("//*[@id='card-holder']").fill('Pavan');
  await page.locator("//*[@id='name']").fill('polo');
  await page.on('dialog', async dialog => {
  await dialog.accept();
  });
  await page.locator("//*[@id='btn-alert']").click();
 

  //  const parentFrame = page.frameLocator('#parentFrame');

 // const innerFrame = parentFrame.frameLocator('#childFrame'); innerframe

 // await innerFrame.locator('#username').fill('Pavan');
});

test('Mouse Hover',async({page})=>{
    await page.locator("//*[@id='btn-hover']").scrollIntoViewIfNeeded();
    await page.locator("//*[@id='btn-hover']").hover();
    await page.getByTestId('hover-item-tablets').click();
})
test('rightclick doubleclick',async({page})=>{
    await page.locator("//*[@id='btn-context-target']").scrollIntoViewIfNeeded();
    await page.locator("//*[@id='btn-context-target']").click({button:'right'});
    await page.getByTestId('btn-dblclick-copy').dblclick();
    
})

test('drag and drop',async({page})=>{
    await page.locator("//*[@id='drag-washington']").scrollIntoViewIfNeeded();
   const source=await page.locator("//*[@id='drag-washington']");
   const destination=await page.getByTestId('drop-usa');
   await source.dragTo(destination);
})

test('keyboard actions',async({page})=>{

    await page.getByTestId('keyboard-secret-input').click();
    await page.keyboard.type('PLAYWRIGHT');
    await page.getByTestId('keyboard-option-qa').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.getByTestId('keyboard-copy-source').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+C');
    await page.getByTestId('keyboard-copy-destination').click();
    await page.keyboard.press('Control+V');
})













