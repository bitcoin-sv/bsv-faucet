import { User, TransactionWithUser } from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import LatestTransactionsTableRow from './latest-transactions-table-row';

const LatestTransactionsTable = ({
  user,
  transactions
}: {
  user: User;
  transactions: TransactionWithUser[];
}) => (
  <Table className="overflow-x-auto">
    <TableHeader>
      <TableRow>
        <TableHead>Tx ID</TableHead>
        <TableHead>Date</TableHead>
        {user.role === 'admin' && <TableHead>Account</TableHead>}
        <TableHead>Beef Tx</TableHead>
        <TableHead>Tx Type</TableHead>
        <TableHead>Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.map((transaction) => (
        <LatestTransactionsTableRow
          key={transaction.txid}
          user={user}
          transaction={transaction}
        />
      ))}
    </TableBody>
  </Table>
);

export default LatestTransactionsTable;
