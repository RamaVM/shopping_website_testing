# SauceDemo Web Application Testing

## Project Overview

This project demonstrates end-to-end functional testing and test automation of the SauceDemo web application using Playwright and TypeScript.

The project covers critical user workflows including:

- User Authentication
- Product Module
- Product Details
- Product Sorting
- Add to Cart
- Remove from Cart
- Cart Validation
- Empty Cart Validation
- Boundary Value Analysis for Login Fields
- Cross-Browser Testing

The automation framework follows the Page Object Model (POM) design pattern to improve code maintainability and reusability.

---

## Tech Stack

- JavaScript
- TypeScript
- Playwright
- Git
- GitHub
- Excel
- HTML Test Reports

---

## Application Under Test

**Website:** SauceDemo

The application is used for practicing manual testing concepts and automated functional testing.

---

# Project Modules

## 1. Authentication Module

The following scenarios were automated:

### Positive Testing

- Verify login with valid username and valid password

### Negative Testing

- Verify login with valid username and invalid password
- Verify login with invalid username and valid password
- Verify login with invalid username and invalid password
- Verify validation when username is empty
- Verify validation when password is empty
- Verify validation when username and password are empty
- Verify that the password field is masked

---

## 2. Boundary Value Analysis

For Boundary Value Analysis practice, the following assumed requirement was used:

> Username and Password should contain a minimum of 2 characters and a maximum of 20 characters.

The following boundary values were tested:

| Boundary Test | Length |
|---|---:|
| Min - 1 | 1 |
| Min | 2 |
| Min + 1 | 3 |
| Max - 1 | 19 |
| Max | 20 |
| Max + 1 | 21 |

Boundary testing was performed for:

- Username
- Password

### Expected Validation

- Values below 2 characters should be rejected
- Values from 2 to 20 characters should be accepted
- Values above 20 characters should be rejected

> Note: The 2-20 character validation is an assumed requirement created for Boundary Value Analysis practice and is not claimed to be an official SauceDemo requirement.

---

## 3. Product Module

The following product functionality was automated:

- Verify Products page is displayed
- Verify products are displayed
- Verify product images are displayed
- Verify product names are displayed
- Verify product prices are displayed
- Verify Add to Cart buttons are displayed
- Add a product to the cart
- Remove a product from the Products page
- Sort products from A to Z
- Sort products from Z to A
- Sort products by Price Low to High
- Sort products by Price High to Low
- Open product details
- Add a product from the Product Details page
- Remove a product from the Product Details page
- Navigate back to the Products page

---

## 4. Cart Module

The following cart functionality was automated:

- Verify added products are displayed in the cart
- Remove a product from the cart
- Verify the cart becomes empty after removing products
- Verify Continue Shopping redirects to the Products page
- Verify Checkout button is displayed
- Verify checkout functionality with products in the cart
- Verify empty cart behavior

---

# Potential Defect / Requirement Mismatch Identified

## DEF-001: Empty Cart Checkout Validation

### Module
Cart

### Title
User can proceed to checkout with an empty cart

### Preconditions

- User is successfully logged in
- Cart contains no products

### Steps to Reproduce

1. Navigate to the Cart page
2. Verify that the cart is empty
3. Click the Checkout button

### Expected Result

Based on the project test requirement, the user should:

- See a `Cart is empty` validation message
- Remain on the Cart page

### Actual Result

The application allows the user to proceed to the Checkout page without displaying an empty cart validation message.

### Test Result

The behavior was reproduced during automated testing across:

- Chromium
- Firefox
- WebKit

> Note: This is documented as a potential defect or requirement mismatch because the empty-cart validation behavior was defined as a project testing requirement and is not claimed to be an official SauceDemo requirement.

---

# Test Automation Framework

The project uses the Page Object Model (POM).

## Project Structure

```text
shopping_webapp_testing/
│
├── Automation/
│   │
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── ProductPage.ts
│   │   └── CartPage.ts
│   │
│   ├── test-data/
│   │   └── users.ts
│   │
│   └── tests/
│       ├── Authentication/
│       │   └── login.spec.ts
│       │
│       ├── Products/
│       │   └── products.spec.ts
│       │
│       └── Cart/
│           └── cart.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md