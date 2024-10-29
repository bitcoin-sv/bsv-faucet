import AdminTreasuryHistory from '@/components/AdminTreasuryHistory';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function AdminPage() {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getBalance = async () => {
      const fetchedBalance = await fetchBalance()
      setBalance(fetchedBalance)
      setIsLoading(false)
    }
    getBalance()
  }, [])

  const formatBSV = (amount: number) => amount.toFixed(8)
  const formatSatoshis = (amount: number) => Math.floor(amount * 100000000).toLocaleString()
  const isLowBalance = balance !== null && balance < 10

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin</CardTitle>
        <CardDescription>Admin items.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>

      <AdminTreasuryHistory />
    </Card>
  );
}