import { useEffect, useMemo, useState } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'

import getPlayersByPlayerIds from '../functions/getPlayersByPlayerIds'
import getStatsFromPlayers from '../functions/getStatsFromPlayers'

import { Lineup, Match, PlayerData, PlayerStats } from '../types'
import { Loader2 } from 'lucide-react'

type Props = {
  match: Match | undefined | null
  setPlayerData: React.Dispatch<
    React.SetStateAction<PlayerData[] | undefined | null>
  >
}

export default function TeamSelectionInput({ match, setPlayerData }: Props) {
  const [teamId, setTeamId] = useState('')
  const [playerIdsToFetch, setPlayerIdsToFetch] = useState<string[]>([])

  const season = match?.season_id

  const { data, error, isFetching } = useQuery({
    queryKey: ['players', playerIdsToFetch, season],
    queryFn: () => {
      if (!playerIdsToFetch.length || !season) {
        throw new Error('Pelaajadatan haku ei onnistu')
      }
      return getPlayersByPlayerIds(playerIdsToFetch, season)
    },
    enabled: !!playerIdsToFetch.length && !!season,
    refetchOnWindowFocus: false,
  })

  const processedPlayerData = useMemo(() => {
    if (!match || !data) return null

    const { category_id } = match
    const playerStats = getStatsFromPlayers(data, category_id)

    return data.map((player) => {
      const { first_name, last_name, birthyear, age, nationality, player_id } =
        player
      const stats = playerStats.find(
        (statsItem) => statsItem.player_id === player_id
      ) as PlayerStats
      const lineupInfo = match.lineups.find(
        (lineupPlayer) => lineupPlayer.player_id === player_id
      ) as Lineup

      return {
        first_name,
        last_name,
        player_name: `${last_name} ${first_name}`,
        birthyear,
        age,
        nationality,
        is_in_starting_lineup: lineupInfo.start === '1',
        shirt_number: lineupInfo.shirt_number
          ? Number(lineupInfo.shirt_number)
          : null,
        ...stats,
      }
    })
  }, [data, match])

  useEffect(() => {
    if (processedPlayerData) {
      setPlayerData(processedPlayerData)
    }
  }, [processedPlayerData, setPlayerData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!match || !teamId) return
    const ids = match?.lineups
      .filter((player) => player.team_id === teamId)
      .map((player) => player.player_id)
    setPlayerIdsToFetch(ids)
  }

  if (!match) return null

  return (
    <form action='' onSubmit={handleSubmit}>
      <FormControl as='fieldset' disabled={isFetching} isInvalid={!!error}>
        <Stack spacing={4}>
          <FormLabel as='legend'>Valitse analysoitava joukkue:</FormLabel>
          <RadioGroup onChange={setTeamId} value={teamId}>
            <Stack spacing={2}>
              <Radio value={match?.team_A_id}>{match?.team_A_name}</Radio>
              <Radio value={match?.team_B_id}>{match?.team_B_name}</Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
          <Button
            data-test='teamSelectionSubmit'
            type='submit'
            className='bg-teal-600 hover:bg-teal-700'
            disabled={!teamId}
          >
            {isFetching ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <span>Hae pelaajadata</span>
            )}
          </Button>
        </Stack>
      </FormControl>
    </form>
  )
}
