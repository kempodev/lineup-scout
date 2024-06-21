import { Match, PlayerStats } from '../types'

export default function getPlayeStatsFromMatches(inputMatches: Match[]) {
  if (inputMatches.length < 1) {
    throw new Error('There are no matches to get stats from!')
  }

  // Sort by date ascending date
  const matches = inputMatches
  matches.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  const playerStats: { [key: string]: PlayerStats } = {}

  for (const match of matches) {
    // Loop through each player in the match
    console.log(`Fetching player stats from match ${match.match_id}`)
    for (const player of match.lineups) {
      const {
        player_id,
        player_name,
        shirt_number,
        start,
        playing_time_min,
        goals,
        assists,
        warnings,
        suspensions,
      } = player

      // If the player doesn't exist in the playerStats object, initialize their stats
      if (!playerStats[player_id]) {
        playerStats[player_id] = {
          player_id,
          player_name,
          shirt_number,
          starts: Number(start),
          playing_time_min,
          goals,
          assists,
          warnings,
          suspensions,
        }
      } else {
        // Accumulate the player's stats
        playerStats[player_id].starts += Number(player.start)
        playerStats[player_id].playing_time_min += player.playing_time_min
        playerStats[player_id].goals += player.goals
        playerStats[player_id].assists += player.assists
        playerStats[player_id].warnings += player.warnings
        playerStats[player_id].suspensions += player.suspensions
        // Update to latest shirt number
        playerStats[player_id].shirt_number = player.shirt_number
      }
    }
  }

  // Convert the playerStats object to an array
  return Object.values(playerStats)
}
