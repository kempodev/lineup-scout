import { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

import getPlayersByPlayerIds from '../functions/getPlayersByPlayerIds'
import getStatsFromPlayers from '../functions/getStatsFromPlayers'

import { Lineup, Match, PlayerData, PlayerStats } from '../types'

type Props = {
  match: Match | undefined | null
  setPlayerData: React.Dispatch<
    React.SetStateAction<PlayerData[] | undefined | null>
  >
}

export default function TeamSelectionInput({ match, setPlayerData }: Props) {
  const [teamId, setTeamId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchPlayerData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!match || !teamId) return
    setIsLoading(true)
    const playerIdsToFetch = match?.lineups
      .filter((player) => player.team_id === teamId)
      .map((player) => player.player_id)

    // Get player data for the same season as the match being analyzed
    const season = match.season_id
    const players = await getPlayersByPlayerIds(playerIdsToFetch, season)

    if (players === undefined || players.length === 0) {
      setError('Pelaajadatan haku epäonnistui')
      setIsLoading(false)
      return
    }

    // Aggregate stats per player, include only selected competition
    const { category_id } = match
    const playerStats = getStatsFromPlayers(players, category_id)
    // Combine player info and stats
    const data: PlayerData[] = []
    players.forEach((player) => {
      // Get relevant data from player
      const { first_name, last_name, birthyear, age, nationality } = player
      // Find stats for the player in question
      const stats = playerStats.find(
        (statsItem) => statsItem.player_id === player.player_id
      ) as PlayerStats
      // Get players starting status and number in upcoming match
      const { start, shirt_number } = match.lineups.find(
        (lineupPlayer) => lineupPlayer.player_id === player.player_id
      ) as Lineup

      // Return player info and stats in one object
      data.push({
        first_name,
        last_name,
        birthyear,
        age,
        nationality,
        is_in_starting_lineup: start === '1' ? true : false,
        shirt_number: shirt_number ? Number(shirt_number) : null,
        ...stats,
      })
    })
    setPlayerData(data)
    setIsLoading(false)
  }

  return (
    <form action='' onSubmit={(e) => fetchPlayerData(e)}>
      <FormControl as='fieldset' disabled={isLoading} isInvalid={!!error}>
        <Stack spacing={4}>
          <FormLabel as='legend'>Valitse analysoitava joukkue:</FormLabel>
          <RadioGroup onChange={setTeamId} value={teamId}>
            <Stack spacing={2}>
              <Radio value={match?.team_A_id}>{match?.team_A_name}</Radio>
              <Radio value={match?.team_B_id}>{match?.team_B_name}</Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>{error}</FormErrorMessage>
          <Button
            type='submit'
            isDisabled={!teamId}
            colorScheme='teal'
            isLoading={isLoading}
          >
            Hae pelaajadata
          </Button>
        </Stack>
      </FormControl>
    </form>
  )
}
