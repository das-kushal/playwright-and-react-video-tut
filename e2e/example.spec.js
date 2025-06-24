// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should have correct metadata", async ({ page }) => {
    // await page.goto("http://localhost:5173/");

    await expect(page).toHaveTitle("Vite + React");

    await expect(page.getByRole("heading")).toHaveText("Home page");
    await expect(page.getByRole("link", { name: "Go to Form" })).toBeVisible();
  });

  test("should navigate to Form page", async ({ page }) => {
    // await page.goto("http://localhost:5173/");

    // await page.click("text=Go to Form");

    await page.getByRole("link", { name: "Go to Form" }).click();

    await expect(page).toHaveURL("http://localhost:5173/form");

    await expect(page.locator("h3")).toHaveText("Form page");
  });
});

test.describe("Form Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/form");
  });

  test("should have correct metadata", async ({ page }) => {
    // await page.goto("http://localhost:5173/form");

    await expect(page).toHaveTitle("Vite + React");

    await expect(page.getByRole("heading")).toHaveText("Form page");
    await expect(page.getByRole("link", { name: "Go to Home" })).toBeVisible();
  });

  test("should add item to list", async ({ page }) => {
    // await page.goto("http://localhost:5173/form");

    const input = page.getByPlaceholder("Enter item name");
    const button = page.getByRole("button", { name: "Add Item" });

    await input.fill("Test Item");
    await button.click();

    const itemsList = page.locator("ul");
    await expect(itemsList).toContainText("Test Item");
    await expect(input).toBeEmpty();
  });
});
