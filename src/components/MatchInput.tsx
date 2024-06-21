import { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Stack,
  AlertDescription,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

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
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const fetchMatchData = async (id: string) => {
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
          colorScheme='teal'
          isLoading={isLoading}
          onClick={() => fetchMatchData(matchId)}
        >
          Hae ottelu
        </Button>
        {!match && !isLoading ? (
          <Alert status='warning'>
            <AlertIcon />
            <AlertDescription>
              HUOM! Ottelu-id on URL-osoitteessa oleva numero, ei ottelusivulla
              oleva ottelun numero
            </AlertDescription>
          </Alert>
        ) : null}
      </Stack>
    </FormControl>
  )
}
