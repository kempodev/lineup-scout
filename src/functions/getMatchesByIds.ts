export default async function getMatchesByIds(ids: string[]) {
  const options = {
    method: 'GET',
    headers: { Accept: 'json/df8e84j9xtdz269euy3h' },
  }

  try {
    const promises = ids.map((id) => {
      return fetch(
        `https://spl.torneopal.fi/taso/rest/getMatch?match_id=${id}`,
        options
      )
    })
    const responses = await Promise.all(promises)
    const data = await Promise.all(responses.map((response) => response.json()))
    const matches = data.map((item) => item.match)
    return matches
  } catch (err) {
    console.error('Error:', err)
  }
}
