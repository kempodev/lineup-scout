export type MatchCall = {
  call: Call
  match?: Match
}

export type MatchesCall = {
  call: Call
  matches?: TeamMatch[]
}

export type PlayerCall = {
  call: Call
  player?: Player
}

export type Call = {
  status: string
  error_message?: string
  error?: string
}

export type TeamMatch = {
  match_id: string
  season_id: string
  status: string
  category_id: string
  category_name: string
  date: string
  time: string
  winner_id: string
  winner: 'Home' | 'Away' | 'Tie'
}

export type Match = {
  match_id: string
  date: string
  time: string
  time_zone_offset: string
  team_A_id: string
  team_B_id: string
  team_A_name: string
  team_B_name: string
  lineups_filled: number
  lineups: Lineup[]
  category_id: string
  category_name: string
  venue_name: string
  venue_city_name: string
  status: string
  season_id: string
  fs_A: string
  fs_B: string
}

// Player in a match lineup
export type Lineup = {
  lineup_id: string
  match_id: string
  team_id: string
  player_id: string
  player_name: string
  first_name: string
  last_name: string
  shirt_number: string
  shirt_name: string
  short_name: string
  start: string
}

// Player general info
export type Player = {
  player_id: string
  first_name: string
  last_name: string
  birthyear: string
  age: number
  nationality: string
  matches: PlayerMatch[]
}

// Match in a player object
export type PlayerMatch = {
  match_id: string
  date: string
  time: string
  team_A_id: string
  team_B_id: string
  team_A_name: string
  team_B_name: string
  category_name: string
  category_id: string
  venue_name: string
  venue_city_name: string
  player_goals: string
  player_assists: string
  player_warnings: string
  player_suspensions: string
  playing_time_min: number
  starting_player: string
  sport_id: string
  status: string
}

// Aggregated player stats
export type PlayerStats = {
  player_id: string
  goals: number
  assists: number
  warnings: number
  suspensions: number
  playing_time_min: number
  starts: number
  nr_of_matches: number
  latest_match_date: Date | null
}

export type PlayerData = {
  player_id: string
  first_name: string
  last_name: string
  birthyear: string
  age: number
  nationality: string
  is_in_starting_lineup: boolean
  goals: number
  assists: number
  warnings: number
  suspensions: number
  playing_time_min: number
  starts: number
  nr_of_matches: number
  latest_match_date: Date | null
  shirt_number: number | null
}
