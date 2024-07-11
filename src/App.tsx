import { useState } from 'react'

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
      <header className='py-3 mb-3'>
        <h1 className='uppercase tracking-wider font-sans text-center text-4xl font-monoslab font-bold'>
          <span>Lineup</span>
          <span className='bg-teal-600 text-white px-2 ml-1 rounded'>
            Scout
          </span>
        </h1>
      </header>
      <main className='container space-y-6'>
        <section className='mx-auto max-w-lg space-y-4'>
          <MatchInput
            match={match}
            setMatch={setMatch}
            setPlayerData={setPlayerData}
          />
          {match && <MatchInfo match={match} />}
          {match && (
            <TeamSelectionInput match={match} setPlayerData={setPlayerData} />
          )}
        </section>

        {playerData && match && (
          <PlayerDataTable playerData={playerData} match={match} />
        )}
      </main>
    </>
  )
}

export default App

