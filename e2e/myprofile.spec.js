import { test, expect } from "@playwright/test";

test.describe("api testing",()=> {
  test("test api response", async ({ request }) => {
    const okStatus = 200;
    const response = await request.get("https://reqres.in/api/users?page=2"); // url is not working
    expect(response.status()).toBe(okStatus);

    // const data = await response.text();
    const res = await response.json();
    const data=res.data;
    console.log(res);
    expect(res.total).toBe(12);
    expect(res.per_page).toBe(6);
    expect(JSON.stringify(data)).toContain("Michael");

  });
});

test.describe("Profile Kd83", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://kushaldas-me.vercel.app/");
  });

  test("my profile page", async ({ page }) => {
    await expect(page).toHaveTitle("Kushal Das - Portfolio");

    await expect
      .soft(page.getByRole("heading", { name: "Kushal Das" }))
      .toBeVisible();

    await expect(
      page.getByText("Program Associate @ Wells Fargo")
    ).toBeVisible();
  });

  test("send a contact me message", async function ({ page }) {
    const name = page.locator("id=name");
    const email = page.locator("id=email");
    const msg = page.locator("id=message");

    await name.fill("Test user");
    await email.fill("test@test.com");
    await msg.fill("This is a test message");

    const submitButton = page.getByRole("button", { name: "Submit" });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    await page.waitForTimeout(1000); // Wait for 1 seconds to see the result
    const successMessage = page.locator("role=alert").filter({
      hasText: "Your message was sent successfully!!",
    });
    await expect(successMessage).toBeVisible();
  });

  test("visual testing", async ({page})=> {
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("profile-shot.png", {
      mask:[
        page.locator("image"),
      ]
    });
  })
});
