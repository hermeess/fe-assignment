import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { AppProviders } from './providers/AppProviders'

function renderApp() {
  return render(
    <AppProviders>
      <App />
    </AppProviders>,
  )
}

describe('dashboard', () => {
  it('loads the customer dashboard from the mock API', async () => {
    renderApp()

    await waitFor(
      () => expect(screen.getByRole('heading', { name: 'Good evening, Ava' })).toBeInTheDocument(),
      { timeout: 3000 },
    )
  })
})
