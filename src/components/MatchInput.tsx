import { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Stack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Center,
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
  const { isOpen, onOpen, onClose } = useDisclosure()

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

            <Button
              variant={'ghost'}
              colorScheme='orange'
              mx={2}
              onClick={onOpen}
            >
              Ohje
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ohje</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={'36px'}>
                    <Box>
                      <Alert status='success' mb={2}>
                        <AlertIcon />
                        Kopioi ottelu-id URL:stä
                      </Alert>
                      <Image src='src/assets/url.png' alt='URL' />
                    </Box>
                    <Box>
                      <Alert status='error' mb={2}>
                        <AlertIcon />
                        Älä käytä ottelun numeroa
                      </Alert>
                      <Center>
                        <Image
                          objectFit='contain'
                          style={{ filter: 'grayscale(100%)' }}
                          src='src/assets/bad_example.png'
                          alt='Bad example'
                        />
                      </Center>
                    </Box>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    OK
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Alert>
        ) : null}
      </Stack>
    </FormControl>
  )
}
