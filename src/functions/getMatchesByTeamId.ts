import { MatchesCall } from '../types'

export default async function getMatchesByTeamId(
  teamId: string,
  seasonId: string
) {
  const url = `https://spl.torneopal.fi/taso/rest/getMatches?team_id=${teamId}&season_id=${seasonId}`

  const options = {
    method: 'GET',
    headers: { Accept: 'json/df8e84j9xtdz269euy3h' },
  }

  try {
    const response = await fetch(url, options)
    const json: MatchesCall = await response.json()
    if (json.call.status === 'error' && json.call.error_message) {
      console.error('Error:', json.call.error_message)
    }
    if (json.call.status === 'error' && json.call.error) {
      console.error('Error:', json.call.error)
    }
    return json
  } catch (err) {
    console.error('Error:', err)
  }
}
