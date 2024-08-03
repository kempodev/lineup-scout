import { useEffect, useState } from 'react'
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
import { useQuery } from '@tanstack/react-query'

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
  const [matchIdInput, setMatchIdInput] = useState('')
  const [matchId, setMatchId] = useState('')

  const { data, error, isFetching } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => getMatchById(matchId),
    enabled: !!matchId,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data && data.match) {
      setMatch(data.match)
    }
  }, [data, setMatch])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMatch(null)
    setPlayerData(null)
    setMatchId(matchIdInput)
  }

  return (
    <form action='' onSubmit={handleSubmit}>
      <FormControl as='fieldset' isInvalid={!!error} disabled={isFetching}>
        <Stack>
          <FormLabel as='legend'>
            Syötä ottelu-id Palloliiton tulospalvelusta:
          </FormLabel>
          <Input
            data-test='matchIdInput'
            id='matchId'
            name='matchId'
            type='text'
            placeholder='Ottelu-id'
            value={matchIdInput}
            onChange={(e) => setMatchIdInput(e.target.value)}
          />
          <FormErrorMessage data-test='matchInputErrorMessage'>
            {error?.message}
          </FormErrorMessage>
          <Button
            data-test='matchInputSubmit'
            type='submit'
            className='bg-teal-600 hover:bg-teal-700'
            disabled={isFetching || !matchIdInput}
          >
            {isFetching ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <span>Hae ottelu</span>
            )}
          </Button>
          {!match && !isFetching ? (
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
