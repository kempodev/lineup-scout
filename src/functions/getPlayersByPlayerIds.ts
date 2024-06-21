import { Player, PlayerCall } from '../types'

export default async function getPlayersByPlayerIds(
  playerIds: string[],
  seasonId: string
) {
  const options = {
    method: 'GET',
    headers: { Accept: 'json/df8e84j9xtdz269euy3h' },
  }

  try {
    const promises = playerIds.map((id) => {
      return fetch(
        `https://spl.torneopal.net/taso/rest/getPlayer?player_id=${id}&season_id=${seasonId}`,
        options
      )
    })
    const responses = await Promise.all(promises)
    const data: PlayerCall[] = await Promise.all(
      responses.map((response) => response.json())
    )
    const players = data.map((item) => item.player)
    const a = players.filter((p) => typeof p !== 'undefined') as Player[]
    return a
  } catch (err) {
    console.error('Error:', err)
  }
}
