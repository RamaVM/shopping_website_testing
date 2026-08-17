import { test, expect } from '@playwright/test';


test('Valid user login', async({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Invalid password login', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('ram');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
})

test('Invalid user_name  login', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('ram');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
})

test('Empty user_name  login', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
})


test('Password should be masked ', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('#password')).toHaveAttribute('type','password');

})

test('Empty password login', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
})

test('Invalid user login', async({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').fill('ram');
    await page.locator('#password').fill('bhim');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')
});

test('Empty user name and password', async({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required')
});
