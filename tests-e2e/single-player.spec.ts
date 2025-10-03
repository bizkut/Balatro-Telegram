import { test, expect } from '@playwright/test';

test.describe('Single-Player Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test
    await page.goto('/');
  });

  test('should load the main page correctly', async ({ page }) => {
    // Expect a title to be present
    await expect(page.locator('h1')).toHaveText('Balatro TMA');
    // Expect the "Draw Hand" button to be visible
    await expect(page.getByRole('button', { name: 'Draw Hand' })).toBeVisible();
    // Expect the placeholder text to be visible initially
    await expect(page.getByText('Click "Draw Hand" to start.')).toBeVisible();
  });

  test('should draw a hand of 5 cards when the button is clicked', async ({ page }) => {
    // Click the "Draw Hand" button
    await page.getByRole('button', { name: 'Draw Hand' }).click();

    // Check that 5 card elements are now visible in the hand
    const handContainer = page.locator('.hand');
    const cards = handContainer.locator('.card');
    await expect(cards).toHaveCount(5);

    // Check that the remaining cards count is updated
    await expect(page.getByText('Cards remaining in deck: 47')).toBeVisible();
  });

  test('should evaluate and display the hand type after drawing', async ({ page }) => {
    // Click the "Draw Hand" button
    await page.getByRole('button', { name: 'Draw Hand' }).click();

    // The hand type is displayed. We don't know what hand will be drawn,
    // so we check that the "Hand Type" heading exists and is followed by some text.
    // A more robust test could involve mocking the deck to get a predictable hand.
    const handInfo = page.locator('.hand-info');
    await expect(handInfo.locator('h3')).toContainText('Hand Type:');

    // Example: Check if the text contains one of the possible hand types
    const handTypeText = await handInfo.locator('h3').textContent();
    const possibleHandTypes = [
        'High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight',
        'Flush', 'Full House', 'Four of a Kind', 'Straight Flush', 'Royal Flush'
    ];

    const isValidHandType = possibleHandTypes.some(type => handTypeText?.includes(type));
    expect(isValidHandType).toBe(true);
  });
});