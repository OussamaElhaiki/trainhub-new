import { test, expect } from "@playwright/test"

test("home page loads", async ({ page }) => {
  await page.goto("/en")
  await expect(page).toHaveTitle(/TrainHub/)
})

test("language switcher switches to French", async ({ page }) => {
  await page.goto("/en")
  await page.getByText("FR").click()
  await expect(page).toHaveURL(/\/fr/)
})

test("departure schedule page loads", async ({ page }) => {
  await page.goto("/en/trains/departures")
  await expect(page.getByRole("heading", { name: /Departure Schedule/i })).toBeVisible()
})

test("navigation menu opens", async ({ page }) => {
  await page.goto("/en/signin")
  await page.fill('input[name="email"]', "napo@panko.lt")
  await page.fill('input[name="password"]', "12345678")
  await page.getByRole("button", { name: /sign in/i }).click()
  await page.waitForURL(/\/en/)
  await page.getByRole("button", { name: /trains/i }).click()
  await expect(page.getByRole("link", { name: /departure schedule/i })).toBeVisible()
})

test("FR page content is in French", async ({ page }) => {
  await page.goto("/fr")
  await expect(page.getByText(/Bienvenue sur TrainHub/)).toBeVisible()
})

test("sign in page loads", async ({ page }) => {
  await page.goto("/en/signin")
  await expect(page).toHaveURL(/signin/)
})
test("arrivals page loads", async ({ page }) => {
  await page.goto("/en/stations/arrivals")
  await expect(page.getByRole("heading", { name: /arrival/i })).toBeVisible()
})

test("route destinations page loads", async ({ page }) => {
  await page.goto("/en/routes/destinations")
  await expect(page.getByRole("heading", { name: /destinations/i })).toBeVisible()
})

test("FR sign in page loads", async ({ page }) => {
  await page.goto("/fr/signin")
  await expect(page).toHaveURL(/\/fr\/signin/)
})

test("navigation has trains menu", async ({ page }) => {
  await page.goto("/en/signin")
  await page.fill('input[name="email"]', "napo@panko.lt")
  await page.fill('input[name="password"]', "12345678")
  await page.getByRole("button", { name: /sign in/i }).click()
  await page.waitForURL(/\/en$/)
  await expect(page.getByRole("button", { name: /trains/i })).toBeVisible({ timeout: 10000 })
})