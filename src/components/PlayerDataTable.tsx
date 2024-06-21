import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Container,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Match, PlayerData } from '../types'

type Props = {
  playerData: PlayerData[]
  match: Match | undefined | null
}

function TableHead() {
  return (
    <Thead>
      <Tr>
        <Th></Th>
        <Th>Numero</Th>
        <Th>Nimi</Th>
        <Th>Ikä</Th>
        <Th>Ottelut</Th>
        <Th>Avauksessa</Th>
        <Th>Peliaika</Th>
        <Th>Maalit</Th>
        <Th>Syötöt</Th>
        <Th>Varoitukset</Th>
        <Th>Ulosajot</Th>
        <Th>Viimeisin ottelu</Th>
      </Tr>
    </Thead>
  )
}

export default function PlayerDataTable({ playerData, match }: Props) {
  if (!match) return null
  const startingPlayers = playerData.filter((p) => p.is_in_starting_lineup)
  const subs = playerData.filter((p) => !p.is_in_starting_lineup)

  return (
    <>
      <Box p={4}>
        <Container maxW='2xl' mb={4}>
          <Alert status='info'>
            <AlertIcon />
            <AlertDescription>
              {`Data kaudelta ${match.season_id} sarjassa ${match.category_name}`}
            </AlertDescription>
          </Alert>
        </Container>

        <TableContainer>
          <Table variant='striped' size='sm'>
            <TableHead />
            <Tbody>
              {startingPlayers.map(
                ({
                  player_id,
                  shirt_number,
                  last_name,
                  first_name,
                  age,
                  nr_of_matches,
                  starts,
                  playing_time_min,
                  goals,
                  assists,
                  warnings,
                  suspensions,
                  latest_match_date,
                }) => (
                  <Tr key={player_id}>
                    <Td>Avaus</Td>
                    <Td>{shirt_number}</Td>
                    <Td>
                      <Link
                        href={`https://tulospalvelu.palloliitto.fi/person/${player_id}/info`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {`${last_name} ${first_name}`}
                      </Link>
                    </Td>
                    <Td>{age}</Td>
                    <Td isNumeric>{nr_of_matches}</Td>
                    <Td isNumeric>{starts}</Td>
                    <Td isNumeric>{playing_time_min}</Td>
                    <Td isNumeric>{goals}</Td>
                    <Td isNumeric>{assists}</Td>
                    <Td isNumeric>{warnings}</Td>
                    <Td isNumeric>{suspensions}</Td>
                    <Td>
                      {latest_match_date
                        ? latest_match_date.toLocaleDateString()
                        : null}
                    </Td>
                  </Tr>
                )
              )}
              {subs.map(
                ({
                  player_id,
                  shirt_number,
                  last_name,
                  first_name,
                  age,
                  nr_of_matches,
                  starts,
                  playing_time_min,
                  goals,
                  assists,
                  warnings,
                  suspensions,
                  latest_match_date,
                }) => (
                  <Tr key={player_id}>
                    <Td></Td>
                    <Td>{shirt_number}</Td>
                    <Td>
                      <Link
                        href={`https://tulospalvelu.palloliitto.fi/person/${player_id}/info`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >{`${last_name} ${first_name}`}</Link>
                    </Td>
                    <Td>{age}</Td>
                    <Td isNumeric>{nr_of_matches}</Td>
                    <Td isNumeric>{starts}</Td>
                    <Td isNumeric>{playing_time_min}</Td>
                    <Td isNumeric>{goals}</Td>
                    <Td isNumeric>{assists}</Td>
                    <Td isNumeric>{warnings}</Td>
                    <Td isNumeric>{suspensions}</Td>
                    <Td>
                      {latest_match_date
                        ? latest_match_date.toLocaleDateString()
                        : null}
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
