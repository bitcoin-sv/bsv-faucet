import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DepositTransaction } from 'app/api/deposit-history/route'

export function DepositHistoryTable({ depositHistory }: { depositHistory: DepositTransaction[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Txid</TableHead>
          <TableHead>Beef TX</TableHead>
          <TableHead>Vout</TableHead>
          <TableHead>TX Type</TableHead>
          <TableHead className="text-right">Amount (BSV)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {depositHistory.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{format(new Date(transaction.date), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
            <TableCell className="font-mono">{transaction.txid.slice(0, 10)}...</TableCell>
            <TableCell className="font-mono">{transaction.beefTx.slice(0, 10)}...</TableCell>
            <TableCell>{transaction.vout}</TableCell>
            <TableCell>{transaction.txType}</TableCell>
            <TableCell className="text-right">{(transaction.amount / 100000000).toFixed(8)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
