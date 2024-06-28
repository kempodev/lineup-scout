import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import DataTable from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'

import { Match, PlayerData } from '../types'

type Props = {
  playerData: PlayerData[]
  match: Match
}

const columns: ColumnDef<PlayerData>[] = [
  {
    accessorKey: 'is_in_starting_lineup',
    sortUndefined: 'last',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {' '}
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      if (row.getValue('is_in_starting_lineup'))
        return <div className='text-center'>Avaus</div>
      return undefined
    },
  },
  {
    accessorKey: 'shirt_number',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Numero
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'player_name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nimi
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'age',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ikä
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='text-right'>{row.getValue('age')}</div>,
  },
  {
    accessorKey: 'nr_of_matches',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ottelut
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('nr_of_matches')}</div>
    ),
  },
  {
    accessorKey: 'starts',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Avauksessa
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('starts')}</div>
    ),
  },
  {
    accessorKey: 'playing_time_min',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Peliaika
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('playing_time_min')}</div>
    ),
  },
  {
    accessorKey: 'goals',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Maalit
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('goals')}</div>
    ),
  },
  {
    accessorKey: 'assists',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Syötöt
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('assists')}</div>
    ),
  },
  {
    accessorKey: 'warnings',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Varoitukset
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('warnings')}</div>
    ),
  },
  {
    accessorKey: 'suspensions',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ulosajot
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('suspensions')}</div>
    ),
  },
  {
    accessorKey: 'latest_match_date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Viimeisin ottelu
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date | undefined = row.getValue('latest_match_date')
      return date ? (
        <div className='text-right'>{date.toLocaleDateString()}</div>
      ) : null
    },
  },
]

export default function PlayerDataTable({ playerData, match }: Props) {
  const defaultSorting = [
    {
      id: 'is_in_starting_lineup',
      desc: true,
    },
    {
      id: 'shirt_number',
      desc: false,
    },
  ]
  return (
    <>
      <section className='flex flex-col items-center gap-4'>
        <div className='max-w-lg w-full'>
          <Alert status='info'>
            <AlertIcon />
            <AlertDescription>
              {`Data kaudelta ${match.season_id} sarjassa ${match.category_name}`}
            </AlertDescription>
          </Alert>
        </div>
        <div className='w-full'>
          <DataTable
            columns={columns}
            data={playerData}
            defaultSorting={defaultSorting}
          />
        </div>
      </section>
    </>
  )
}
