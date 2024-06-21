import { Player, PlayerStats } from '../types'

export default function getStatsFromPlayers(
  players: Array<Player | undefined>,
  categoryId: string
) {
  const playerStats: PlayerStats[] = []

  for (const player of players) {
    // Skip if player data was not found
    if (player === undefined) continue

    // Loop through each player
    const { player_id } = player
    // Only include matches in the same competition
    const filteredMatches = player.matches.filter(
      (match) => match.category_id === categoryId
    )
    const stats: PlayerStats = {
      player_id,
      goals: 0,
      assists: 0,
      warnings: 0,
      suspensions: 0,
      playing_time_min: 0,
      starts: 0,
      nr_of_matches: filteredMatches.length,
      latest_match_date:
        filteredMatches.length > 0
          ? new Date(filteredMatches[filteredMatches.length - 1].date)
          : null,
    }
    for (const match of filteredMatches) {
      // Accumulate the player's stats from the selected competition
      stats.starts += Number(match.starting_player)
      stats.playing_time_min += match.playing_time_min
      stats.goals += Number(match.player_goals)
      stats.assists += Number(match.player_assists)
      stats.warnings += Number(match.player_warnings)
      stats.suspensions += Number(match.player_suspensions)
    }
    playerStats.push(stats)
  }
  return playerStats
}
