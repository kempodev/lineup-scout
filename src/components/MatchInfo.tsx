import {
  Alert,
  AlertIcon,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'

import { Match } from '../types'

type Props = {
  match: Match
}

export default function MatchInfo({
  match: {
    team_A_name,
    team_B_name,
    category_name,
    date,
    time,
    venue_name,
    venue_city_name,
    status,
    lineups_filled,
    fs_A,
    fs_B,
  },
}: Props) {
  const dateParts = date.split('-')
  const dateString = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
  const timeParts = time.split(':')
  const timeString = `${timeParts[0]}:${timeParts[1]}`

  const getWarningText = () => {
    if (status === 'Played') {
      return 'Ottelu on jo pelattu'
    }
    if (lineups_filled != 1) {
      return 'Ottelun kokoonpanoja ei ole vielä täytetty'
    }
  }
  const warningText = getWarningText()

  return (
    <>
      <Card>
        <CardHeader>
          <Flex justify={'space-between'}>
            <Heading size='sm'>
              {team_A_name} - {team_B_name}
            </Heading>
            {status === 'Played' ? (
              <Heading size='sm'>
                {fs_A} - {fs_B}
              </Heading>
            ) : null}
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{category_name}</Text>
          <Text>
            {dateString} {timeString}
          </Text>
          <Text>
            {venue_name}, {venue_city_name}
          </Text>
        </CardBody>
        <Alert status='warning'>
          <AlertIcon />
          {warningText}
        </Alert>
      </Card>
    </>
  )
}
