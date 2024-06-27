import { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Box,
  Text,
  Skeleton,
} from '@chakra-ui/react'

import getMatchesByTeamId from '../functions/getMatchesByTeamId'

import { Match, TeamMatch } from '../types'

type Props = {
  match: Match
}

export default function MatchInfo({
  match: {
    team_A_name,
    team_B_name,
    team_A_id,
    team_B_id,
    category_name,
    date,
    time,
    venue_name,
    venue_city_name,
    status,
    lineups_filled,
    fs_A,
    fs_B,
    season_id,
  },
}: Props) {
  const [teamAMatches, setTeamAMatches] = useState<TeamMatch[]>()
  const [teamBMatches, setTeamBMatches] = useState<TeamMatch[]>()

  useEffect(() => {
    const fetchTeamAMatches = async () => {
      const result = await getMatchesByTeamId(team_A_id, season_id)
      if (!result || result.call.status === 'error') return
      setTeamAMatches(result.matches)
    }
    const fetchTeamBMatches = async () => {
      const result = await getMatchesByTeamId(team_B_id, season_id)
      if (!result || result.call.status === 'error') return
      setTeamBMatches(result.matches)
    }

    fetchTeamAMatches()
    fetchTeamBMatches()
  }, [team_A_id, team_B_id, season_id])

  let teamALast5Matches
  let teamBLast5Matches

  if (teamAMatches) {
    teamALast5Matches = getLast5Matches(teamAMatches)
  }

  if (teamBMatches) {
    teamBLast5Matches = getLast5Matches(teamBMatches)
  }

  const dateParts = date.split('-')
  const dateString = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
  const timeParts = time.split(':')
  const timeString = `${timeParts[0]}:${timeParts[1]}`

  const warningText = getWarningText()

  return (
    <>
      <Card>
        <CardHeader>
          <Flex justify={'center'}>
            <Heading size='md' mb={4}>
              {team_A_name} – {team_B_name}
            </Heading>
          </Flex>
          <Flex justify={'space-between'} align={'center'}>
            <Box>
              <Skeleton
                h={'20px'}
                w={'90px'}
                isLoaded={teamALast5Matches !== undefined}
                data-testid='skeleton'
              >
                {teamALast5Matches &&
                  getForm(teamALast5Matches, team_A_id).map((el, idx) => (
                    <Badge key={idx} colorScheme={el.color} data-testid='badge'>
                      {el.text}
                    </Badge>
                  ))}
              </Skeleton>
            </Box>
            <Box>
              {status === 'Played' ? (
                <Text as={'b'} fontSize={'xl'}>
                  {fs_A} – {fs_B}
                </Text>
              ) : null}
            </Box>
            <Box>
              <Skeleton
                h={'20px'}
                w={'90px'}
                isLoaded={teamBLast5Matches !== undefined}
                data-testid='skeleton'
              >
                {teamBLast5Matches &&
                  getForm(teamBLast5Matches, team_B_id).map((el, idx) => (
                    <Badge key={idx} colorScheme={el.color} data-testid='badge'>
                      {el.text}
                    </Badge>
                  ))}
              </Skeleton>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody fontSize={'sm'}>
          <Text>{category_name}</Text>
          <Text>
            {dateString} {timeString}
          </Text>
          <Text>
            {venue_name}, {venue_city_name}
          </Text>
        </CardBody>
        {!warningText ? null : (
          <Alert status='warning'>
            <AlertIcon />
            {warningText}
          </Alert>
        )}
      </Card>
    </>
  )

  function getWarningText() {
    if (status === 'Played') {
      return 'Ottelu on jo pelattu.'
    }
    if (lineups_filled != 1) {
      return 'Ottelun kokoonpanoja ei ole vielä täytetty.'
    }
  }

  function getForm(matches: TeamMatch[], teamId: string) {
    const results = matches.map((match) => {
      if (match.winner === 'Tie') return { text: 'T', color: 'yellow' }
      if (match.winner_id === teamId) return { text: 'V', color: 'green' }
      return { text: 'H', color: 'red' }
    })
    return results
  }

  function getLast5Matches(matches: TeamMatch[]) {
    return matches
      .filter((match) => match.status === 'Played')
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      .slice(-5)
  }
}
