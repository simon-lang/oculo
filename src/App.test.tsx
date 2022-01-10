import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('Renders', () => {
  render(<App />)
  const groupHeading = screen.getByText(/Group/i)
  expect(groupHeading).toBeInTheDocument()
})

test('Default list by date', async () => {
  render(<App />)
  const groups = screen.getAllByRole('heading', { level: 3 })
  expect(groups).toHaveLength(2)
  screen.getByText(/1 Apr, 2019/i)
  screen.getByText(/13 Apr, 2019/i)
  const items = await screen.findAllByRole('listitem')
  expect(items).toHaveLength(6)
})

test('Click to group by modality', async () => {
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: 'modality' }))
  screen.getByText(/Modality: OCT/i)
  screen.getByText(/Modality: OP/i)
})

test('Filter by date', async () => {
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: '2019-04-01' }))
  const items = await screen.findAllByRole('listitem')
  expect(items).toHaveLength(4)
})

test('Filter by modality', async () => {
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: 'modality' }))
  await userEvent.click(screen.getByRole('button', { name: 'OP' }))
  const items = await screen.findAllByRole('listitem')
  expect(items).toHaveLength(2)
})
