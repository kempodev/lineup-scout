import { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Input,
  Stack,
  AlertDescription,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

import getMatchById from '../functions/getMatchById'

import { Match, PlayerData } from '../types'

type Props = {
  match: Match | undefined | null
  setMatch: React.Dispatch<React.SetStateAction<Match | null | undefined>>
  setPlayerData: React.Dispatch<
    React.SetStateAction<PlayerData[] | undefined | null>
  >
}

export default function MatchInput({ match, setMatch, setPlayerData }: Props) {
  const [matchId, setMatchId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchMatchData = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault()
    setIsLoading(true)
    setMatch(null)
    setPlayerData(null)
    const result = await getMatchById(id)
    if (result !== undefined) {
      if (result.call.status === 'error' && result.call.error_message) {
        setError(`Tapahtui virhe: ${result.call.error_message}`)
        setIsLoading(false)
        return
      }
      if (result.call.status === 'error' && result.call.error) {
        setError(`Tapahtui virhe: ${result.call.error}`)
        setIsLoading(false)
        return
      }
      setMatch(result.match)
      setError('')
    }
    setIsLoading(false)
  }

  return (
    <form action='' onSubmit={(e) => fetchMatchData(e, matchId)}>
      <FormControl as='fieldset' disabled={isLoading} isInvalid={!!error}>
        <Stack>
          <FormLabel as='legend'>
            Syötä ottelu-id Palloliiton tulospalvelusta:
          </FormLabel>
          <Input
            id='matchId'
            type='text'
            placeholder='Ottelu-id'
            value={matchId}
            onChange={(e) => setMatchId(e.target.value)}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
          <Button
            type='submit'
            className='bg-teal-600 hover:bg-teal-700'
            disabled={!matchId}
          >
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <span>Hae ottelu</span>
            )}
          </Button>
          {!match && !isLoading ? (
            <Alert status='warning'>
              <AlertIcon />
              <AlertDescription>
                Ottelu-id on URL-osoitteessa oleva numero, ei ottelusivulla
                oleva ottelun numero.
              </AlertDescription>
            </Alert>
          ) : null}
        </Stack>
      </FormControl>
    </form>
  )
}
