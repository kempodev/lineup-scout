import { useState } from 'react'
import { Center, Container, Heading, Stack } from '@chakra-ui/react'

import MatchInfo from './components/MatchInfo'
import MatchInput from './components/MatchInput'
import TeamSelectionInput from './components/TeamSelectionInput'
import PlayerDataTable from './components/PlayerDataTable'

import { Match, PlayerData } from './types'

function App() {
  const [match, setMatch] = useState<Match | undefined | null>(null)
  const [playerData, setPlayerData] = useState<
    PlayerData[] | undefined | null
  >()

  return (
    <>
      <Container maxW='2xl'>
        <Stack spacing={4}>
          <Center>
            <Heading
              my={4}
              textTransform={'uppercase'}
              letterSpacing={2}
              fontFamily={'Spline Sans Mono'}
              fontStyle={'italic'}
            >
              Lineup Scout
            </Heading>
          </Center>
          <MatchInput
            match={match}
            setMatch={setMatch}
            setPlayerData={setPlayerData}
          />
          {!match ? null : <MatchInfo match={match} />}
          {!match ? null : (
            <TeamSelectionInput match={match} setPlayerData={setPlayerData} />
          )}
        </Stack>
      </Container>

      {!playerData ? null : (
        <PlayerDataTable playerData={playerData} match={match} />
      )}
    </>
  )
}

export default App

