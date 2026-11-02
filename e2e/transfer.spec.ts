import { expect, test } from '@playwright/test'

test('customer can complete a transfer from the deep link', async ({ page }) => {
  await page.goto('/#transfer')

  const dialog = page.getByRole('dialog', { name: 'New transfer' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('option', { name: /Jamie Tan/ }).click()
  await dialog.getByRole('button', { name: 'Continue' }).click()
  const amount = dialog.getByLabel('Amount')
  await amount.fill('5')
  await amount.blur()
  await expect(amount).toHaveValue('5.00')
  await amount.fill('100')
  await dialog.getByRole('button', { name: 'Continue' }).click()
  await expect(dialog.getByRole('heading', { name: 'Check the details' })).toBeVisible()
  await dialog.getByRole('button', { name: 'Confirm transfer' }).click()

  await expect(dialog.getByRole('heading', { name: 'Transfer sent' })).toBeVisible()
  await expect(dialog.getByText(/Reference TRF-/)).toBeVisible()
  await dialog.getByRole('button', { name: 'Back to dashboard' }).click()
  await expect(page.getByText(/17,020\.55/)).toBeVisible()
  await expect(page.getByText('Transfer to Jamie Tan')).toBeVisible()
})
