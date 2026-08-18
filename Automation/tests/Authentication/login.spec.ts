import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import { users, boundaryData } from '../../test-data/users';

test('Valid user login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
    );

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});


test('Invalid password login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.invalidPassword.username,
        users.invalidPassword.password
    );

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
    );
});


test('Invalid user_name login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
    );

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
    );
});


test('Empty user_name login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username is required'
    );
});


test('Password should be masked', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
});


test('Empty password login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Password is required'
    );
});


test('Invalid user login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.invalidCredentials.username,
        users.invalidCredentials.password
    );
    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
    );
});


test('Empty user name and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username is required'
    );
});

// ================================
// Boundary Value Analysis
// Assumed Requirement:
// Username and Password must be
// between 2 and 20 characters
// ================================


// ---------- USERNAME BOUNDARY TESTS ----------

// Min - 1 = 1 character
test('Username should reject 1 character', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.usernameInput.fill(boundaryData.minMinusOne);

    await expect(loginPage.errorMessage).toHaveText(
        'Username must contain at least 2 characters'
    );
});


// Min = 2 characters
test('Username should accept minimum 2 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.usernameInput.fill(boundaryData.min);

    await expect(loginPage.usernameInput).toHaveValue(boundaryData.min);
});


// Min + 1 = 3 characters
test('Username should accept 3 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.usernameInput.fill(boundaryData.minPlusOne);

    await expect(loginPage.usernameInput).toHaveValue(boundaryData.minPlusOne);
});


// Max - 1 = 19 characters
test('Username should accept 19 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.usernameInput.fill(boundaryData.maxMinusOne);

    await expect(loginPage.usernameInput).toHaveValue(
        boundaryData.maxMinusOne
    );
});


// Max = 20 characters
test('Username should accept maximum 20 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.usernameInput.fill(boundaryData.max);

    await expect(loginPage.usernameInput).toHaveValue(boundaryData.max);
});


// Max + 1 = 21 characters
test('Username should reject 21 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.usernameInput.fill(boundaryData.maxPlusOne);

    await expect(loginPage.errorMessage).toHaveText(
        'Username cannot exceed 20 characters'
    );
});


// ---------- PASSWORD BOUNDARY TESTS ----------

// Min - 1 = 1 character
test('Password should reject 1 character', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.passwordInput.fill(boundaryData.minMinusOne);

    await expect(loginPage.errorMessage).toHaveText(
        'Password must contain at least 2 characters'
    );
});


// Min = 2 characters
test('Password should accept minimum 2 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.passwordInput.fill(boundaryData.min);

    await expect(loginPage.passwordInput).toHaveValue(boundaryData.min);
});


// Min + 1 = 3 characters
test('Password should accept 3 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.passwordInput.fill(boundaryData.minPlusOne);

    await expect(loginPage.passwordInput).toHaveValue(boundaryData.minPlusOne);
});


// Max - 1 = 19 characters
test('Password should accept 19 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.passwordInput.fill(boundaryData.maxMinusOne);

    await expect(loginPage.passwordInput).toHaveValue(
        boundaryData.maxMinusOne
    );
});


// Max = 20 characters
test('Password should accept maximum 20 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.passwordInput.fill(boundaryData.max);

    await expect(loginPage.passwordInput).toHaveValue(boundaryData.max);
});


// Max + 1 = 21 characters
test('Password should reject 21 characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.passwordInput.fill(boundaryData.maxPlusOne);

    await expect(loginPage.errorMessage).toHaveText(
        'Password cannot exceed 20 characters'
    );
});