import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import WalletSettingsForm from './wallet-settings-form';

export default function WalletSettingsPage() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Wallet Alert Settings</CardTitle>
        <CardDescription>
          Configure low-balance alerts for the faucet wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WalletSettingsForm />
      </CardContent>
    </Card>
  );
}

export const dynamic = 'force-dynamic';
