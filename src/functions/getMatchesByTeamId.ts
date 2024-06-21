export default async function getMatchesByTeam(teamId: number) {
  const url = `https://spl.torneopal.fi/taso/rest/getMatches?team_id=${teamId}`

  const options = {
    method: 'GET',
    headers: { Accept: 'json/df8e84j9xtdz269euy3h' },
  }

  try {
    const response = await fetch(url, options)
    const json = await response.json()
    return json.matches
  } catch (err) {
    console.error('Error:', err)
  }
}
