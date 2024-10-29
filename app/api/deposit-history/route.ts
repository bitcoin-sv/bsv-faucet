import { NextResponse } from 'next/server'

export type DepositTransaction = {
  date: string
  txid: string
  beefTx: string
  vout: number
  txType: 'deposit'
  amount: number
}

const mockDepositHistory: DepositTransaction[] = [
  {
    date: '2023-05-15T10:30:00',
    txid: '1a2b3c4d5e6f7g8h9i0j',
    beefTx: 'beef1234567890abcdef',
    vout: 0,
    txType: 'deposit',
    amount: 1000000 
  },
  {
    date: '2023-05-14T14:45:00',
    txid: '2b3c4d5e6f7g8h9i0j1a',
    beefTx: 'beef0987654321fedcba',
    vout: 1,
    txType: 'deposit',
    amount: 500000 
  },
  {
    date: '2023-05-13T09:15:00',
    txid: '3c4d5e6f7g8h9i0j1a2b',
    beefTx: 'beef2468135790acegik',
    vout: 2,
    txType: 'deposit',
    amount: 750000 
  },
]

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // try {
  //   const response = await fetch('', {
  //     headers: {
  //       'Authorization': `Bearer ${process.env.API_TOKEN}`,
  //     },
  //   })
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch deposit history')
  //   }
  //   const data: DepositTransaction[] = await response.json()
  //   return NextResponse.json(data)
  // } catch (error) {
  //   console.error('Error fetching deposit history:', error)
  //   return NextResponse.json({ error: 'Failed to fetch deposit history' }, { status: 500 })
  // }

  return NextResponse.json(mockDepositHistory)
}