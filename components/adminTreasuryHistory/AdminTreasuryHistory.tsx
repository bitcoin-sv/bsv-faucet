import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { DepositTransaction } from 'app/api/deposit-history/route';
import { DepositHistoryTable } from './DepositHistoryTable';

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
];

async function getDepositHistory(): Promise<DepositTransaction[]> {
  try {
    const res = await fetch('/api/deposit-history', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch deposit history');
    return await res.json();
  } catch {
    return mockDepositHistory;
  }
}

function DepositHistoryContent({ promise }: { promise: Promise<DepositTransaction[]> }) {
  return (
    promise
      .then(depositHistory => <DepositHistoryTable depositHistory={depositHistory} />)
      .catch(error => <ErrorState error={error instanceof Error ? error : new Error('Unknown error')} />)
  );
}

export default function AdminTreasuryHistory() {
  const depositHistoryPromise = getDepositHistory();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Treasury - Deposit History</CardTitle>
        <CardDescription>View all deposit transactions in the treasury</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingState />}>
          <DepositHistoryContent promise={depositHistoryPromise} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
