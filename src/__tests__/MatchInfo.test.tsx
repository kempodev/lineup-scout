import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MatchInfo from '../components/MatchInfo'
import getMatchesByTeamId from '../functions/getMatchesByTeamId'
import { Match, TeamMatch } from '../types'

// Mock the getMatchesByTeamId function
jest.mock('../functions/getMatchesByTeamId')

const mockGetMatchesByTeamId = getMatchesByTeamId as jest.MockedFunction<
  typeof getMatchesByTeamId
>

const mockMatch: Match = {
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
      lineup_id: '1',
      match_id: '12345',
      team_id: 'T1001',
      player_id: 'P101',
      player_name: 'Mikko Korhonen',
      first_name: 'Mikko',
      last_name: 'Korhonen',
      shirt_number: '1',
      shirt_name: 'Korhonen',
      short_name: 'M. Korhonen',
      start: '1',
    },
  ],
  category_id: 'C2024',
  category_name: 'Veikkausliiga 2024',
  venue_name: 'Helsinki Olympic Stadium',
  venue_city_name: 'Helsinki',
  status: 'Scheduled',
  season_id: 'S2024',
  fs_A: '0',
  fs_B: '0',
}

const mockTeamMatches: TeamMatch[] = [
  {
    match_id: '12345',
    season_id: 'S2024',
    status: 'Played',
    category_id: 'C2024',
    category_name: 'Veikkausliiga 2024',
    date: '2024-01-01',
    time: '12:00',
    winner_id: '',
    winner: 'Tie',
  },
  {
    match_id: '12346',
    season_id: 'S2024',
    status: 'Played',
    category_id: 'C2024',
    category_name: 'Veikkausliiga 2024',
    date: '2024-01-01',
    time: '12:00',
    winner_id: '',
    winner: 'Tie',
  },
]

describe('MatchInfo component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the component with initial props', () => {
    render(<MatchInfo match={mockMatch} />)
    expect(screen.getByText('FC Helsinki – Turku United')).toBeInTheDocument()
    expect(screen.getByText('Veikkausliiga 2024')).toBeInTheDocument()
    expect(screen.getByText('01.01.2024 12:00')).toBeInTheDocument()
    expect(
      screen.getByText('Helsinki Olympic Stadium, Helsinki')
    ).toBeInTheDocument()
  })

  test('fetches and displays team matches', async () => {
    mockGetMatchesByTeamId.mockResolvedValueOnce({
      call: { status: 'ok' },
      matches: mockTeamMatches,
    })

    render(<MatchInfo match={mockMatch} />)

    await waitFor(() => {
      expect(mockGetMatchesByTeamId).toHaveBeenCalledWith('T1001', 'S2024')
      expect(mockGetMatchesByTeamId).toHaveBeenCalledWith('T1002', 'S2024')
    })

    await waitFor(() => {
      expect(screen.getAllByText('T')).toHaveLength(2) // Assuming 'T' for Tie
    })
  })

  test('displays the correct match information', () => {
    render(<MatchInfo match={mockMatch} />)
    expect(screen.getByText('FC Helsinki – Turku United')).toBeInTheDocument()
    expect(screen.getByText('Veikkausliiga 2024')).toBeInTheDocument()
    expect(screen.getByText('01.01.2024 12:00')).toBeInTheDocument()
    expect(
      screen.getByText('Helsinki Olympic Stadium, Helsinki')
    ).toBeInTheDocument()
  })

  test('handles loading states with Skeleton components', async () => {
    mockGetMatchesByTeamId.mockResolvedValueOnce({
      call: { status: 'ok' },
      matches: mockTeamMatches,
    })

    render(<MatchInfo match={mockMatch} />)

    // Expect two skeletons
    expect(screen.getAllByTestId('skeleton')).toHaveLength(2)

    await waitFor(() => {
      expect(screen.getAllByTestId('skeleton')).toHaveLength(2)
    })
  })

  test('displays warning messages based on match status and lineups', () => {
    const playedMatch = { ...mockMatch, status: 'Played' }
    const unfilledLineupsMatch = { ...mockMatch, lineups_filled: 0 }

    const { rerender } = render(<MatchInfo match={playedMatch} />)

    expect(screen.getByText('Ottelu on jo pelattu.')).toBeInTheDocument()

    rerender(<MatchInfo match={unfilledLineupsMatch} />)
    expect(
      screen.getByText('Ottelun kokoonpanoja ei ole vielä täytetty.')
    ).toBeInTheDocument()
  })
})
