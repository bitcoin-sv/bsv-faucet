import AdminTreasuryHistory from '@/components/adminTreasuryHistory/AdminTreasuryHistory';
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
    <div className="container mx-auto p-4 space-y-4">
      {isLowBalance && (
        <Alert variant="destructive" className="border-red-400 bg-red-400/10 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Low Balance Warning</AlertTitle>
          <AlertDescription>
            The treasury balance is running low (below 10 BSV). Consider adding funds to ensure smooth operations.
          </AlertDescription>
        </Alert>
      )}
      <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl flex items-center text-blue-50">
            <Bitcoin className="mr-2" /> Admin Dashboard
          </CardTitle>
          <CardDescription className="text-blue-100">
            Manage your treasury reserves
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-lg text-white">Total Treasury Reserves</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-24 bg-white/30" />
                ) : (
                  <div className="text-3xl font-bold text-white">{formatBSV(balance!)} BSV</div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-lg text-white">Balance in Satoshis</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-32 bg-white/30" />
                ) : (
                  <div className="text-3xl font-bold text-white">{formatSatoshis(balance!)} sats</div>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Treasury - Deposit History
            <Badge variant="outline" className="ml-2">
              Coming Soon
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Transaction history will be displayed here in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
