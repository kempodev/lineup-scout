import { Player, PlayerCall } from '../types'

export default async function getPlayersByPlayerIds(
  playerIds: string[],
  seasonId: string
) {
  const options = {
    method: 'GET',
    headers: { Accept: 'json/df8e84j9xtdz269euy3h' },
  }

  const promises = playerIds.map((id) => {
    return fetch(
      `https://spl.torneopal.net/taso/rest/getPlayer?player_id=${id}&season_id=${seasonId}`,
      options
    )
  })

  try {
    const responses = await Promise.all(promises)
    const data: PlayerCall[] = await Promise.all(
      responses.map((response) => response.json())
    )
    const players = data.map((item) => item.player)
    const existingPlayers = players.filter(
      (p) => typeof p !== 'undefined'
    ) as Player[]
    if (!existingPlayers || existingPlayers.length === 0) {
      throw new Error('Pelaajadatan haku epäonnistui')
    }
    return existingPlayers
  } catch (err) {
    console.error('Error:', err)
    throw new Error('Pelaajadatan haku epäonnistui')
  }
}
