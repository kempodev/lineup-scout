import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import getMatchById from '../functions/getMatchById'
import MatchInput from '../components/MatchInput'

// Mock the getMatchById function
jest.mock('../functions/getMatchById')

const mockGetMatchById = getMatchById as jest.MockedFunction<
  typeof getMatchById
>

describe('MatchInput component', () => {
  const setMatch = jest.fn()
  const setPlayerData = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the component', () => {
    render(
      <MatchInput
        match={null}
        setMatch={setMatch}
        setPlayerData={setPlayerData}
      />
    )
    expect(
      screen.getByText('Syötä ottelu-id Palloliiton tulospalvelusta:')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ottelu-id')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Hae ottelu/i })
    ).toBeInTheDocument()
  })

  test('handles input changes', async () => {
    const user = userEvent.setup()
    render(
      <MatchInput
        match={null}
        setMatch={setMatch}
        setPlayerData={setPlayerData}
      />
    )
    const input = screen.getByPlaceholderText('Ottelu-id')
    await user.type(input, '12345')
    expect(input).toHaveValue('12345')
  })

  test('submits the form and handles loading state', async () => {
    const user = userEvent.setup()
    const mockMatch = {
      match_id: '12345',
      date: '2024-01-01',
      time: '12:00',
      time_zone_offset: '+02:00',
      team_A_id: 'T1001',
      team_B_id: 'T1002',
      team_A_name: 'FC Helsinki',
      team_B_name: 'Turku United',
      lineups_filled: 1,
      lineups: [
        {
          lineup_id: '37373',
          match_id: '12345',
          player_name: 'Korhonen Mikko',
          team_id: 'T1001',
          player_id: 'P101',
          shirt_number: '1',
          last_name: 'Korhonen',
          first_name: 'Mikko',
          shirt_name: '',
          short_name: '',
          start: '1',
        },
        {
          lineup_id: '37373',
          match_id: '12345',
          player_name: 'Virtanen Jukka',
          team_id: 'T1002',
          player_id: 'P102',
          shirt_number: '4',
          last_name: 'Virtanen',
          first_name: 'Jukka',
          shirt_name: '',
          short_name: '',
          start: '1',
        },
      ],

      category_id: 'C2024',
      category_name: 'Veikkausliiga 2024',
      venue_name: 'Helsinki Olympic Stadium',
      venue_city_name: 'Helsinki',
      status: 'Fixture',
      season_id: 'S2024',
      fs_A: '0',
      fs_B: '0',
    }
    mockGetMatchById.mockResolvedValueOnce({
      call: { status: 'ok' },
      match: { ...mockMatch },
    })

    render(
      <MatchInput
        match={null}
        setMatch={setMatch}
        setPlayerData={setPlayerData}
      />
    )
    const input = screen.getByPlaceholderText('Ottelu-id')
    const button = screen.getByRole('button', { name: /Hae ottelu/i })

    await user.type(input, '12345')
    fireEvent.click(button)
    // await userEvent.click(button)

    expect(button).toBeDisabled()

    await waitFor(() => {
      expect(setMatch).toHaveBeenCalledWith({ ...mockMatch })
      expect(setPlayerData).toHaveBeenCalledWith(null)
      expect(button).not.toBeDisabled()
    })
  })

  test('handles errors with error_message', async () => {
    const user = userEvent.setup()
    mockGetMatchById.mockResolvedValueOnce({
      call: { status: 'error', error_message: 'Invalid ID' },
    })

    render(
      <MatchInput
        match={null}
        setMatch={setMatch}
        setPlayerData={setPlayerData}
      />
    )
    const input = screen.getByPlaceholderText('Ottelu-id')
    const button = screen.getByRole('button', { name: /Hae ottelu/i })

    await user.type(input, 'invalid')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Tapahtui virhe: Invalid ID')).toBeInTheDocument()
      expect(button).not.toBeDisabled()
    })
  })

  test('handles errors with error', async () => {
    const user = userEvent.setup()
    mockGetMatchById.mockResolvedValueOnce({
      call: { status: 'error', error: 'Invalid ID' },
    })

    render(
      <MatchInput
        match={null}
        setMatch={setMatch}
        setPlayerData={setPlayerData}
      />
    )
    const input = screen.getByPlaceholderText('Ottelu-id')
    const button = screen.getByRole('button', { name: /Hae ottelu/i })

    await user.type(input, 'invalid')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Tapahtui virhe: Invalid ID')).toBeInTheDocument()
      expect(button).not.toBeDisabled()
    })
  })
})
