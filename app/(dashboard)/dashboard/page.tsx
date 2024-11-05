'use client';
import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchUser, fetchTransactions } from '@/lib/prisma';
import LatestTransactionsTable from '../latest-transactions-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Timer, Wallet, History, AlertTriangle } from 'lucide-react';
import { createAndSendTransaction } from '@/lib/wallet/transactions';

export default function DashboardPage() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalRequested, setTotalRequested] = useState(0);
  const [faucetBalance, setFaucetBalance] = useState(100000000); // 1 BSV in satoshis
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  interface RequestHistory {
    id: number;
    date: string;
    amount: number;
    status: string;
    txId: string;
  }

  const [recentHistory, setRecentHistory] = useState<RequestHistory[]>([]);
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  useEffect(() => {
    setRecentHistory([
      {
        id: 1,
        date: new Date().toISOString(),
        amount: 50000000,
        status: 'Completed',
        txId: '1234567890abcdef',
      },
    ]);

    const timeLeft = localStorage.getItem('nextRequestTime');
    if (timeLeft) {
      setRemainingTime(Math.max(0, parseInt(timeLeft) - Date.now()));
    }
  }, []);

  const isValidBSVAddress = (addr: string) =>
    /^[mn2][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr);

  const validateForm = () => {
    if (!isValidBSVAddress(address)) return 'Invalid BSV testnet address';
    if (!amount || parseInt(amount) <= 0 || parseInt(amount) > 100000000)
      return 'Invalid amount (max 1 BSV / 100,000,000 satoshis)';
    if (!captchaValue) return 'Please complete the captcha';
    if (remainingTime > 0) return 'Please wait for the cooldown period to end';
    return null;
  };

  const handleRequest = async () => {
    setError('');
    setSuccess('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const amountInSatoshis = parseInt(amount);
      const privKeyWif =
        process.env.NEXT_PUBLIC_PRIVATE_KEY_WIF ||
        'L3zd4gcFAjxr36hwfoWEPGyuNyCCV3g54Sr4RCy8Lmt4wGjHae3k';

      // Use the imported transaction function
      const txid = await createAndSendTransaction(
        privKeyWif,
        address,
        amountInSatoshis,
        'testnet'
      );

      // Update UI state
      setSuccess(
        `Successfully sent ${amount} satoshis to ${address}. TxID: ${txid}`
      );
      setTotalRequested((prev) => prev + amountInSatoshis);
      setFaucetBalance((prev) => prev - amountInSatoshis);

      // Update transaction history
      setRecentHistory((prev) =>
        [
          {
            id: Date.now(),
            date: new Date().toISOString(),
            amount: amountInSatoshis,
            status: 'Completed',
            txId: txid,
          },
          ...prev,
        ].slice(0, 5)
      );

      // Set cooldown period
      const nextRequestTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('nextRequestTime', nextRequestTime.toString());
      setRemainingTime(24 * 60 * 60 * 1000);
    } catch (err: any) {
      setError(`Failed to process request: ${err.message}`);
      console.error('Transaction error:', err);
    }
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value || '');
  };

  const formatTimeRemaining = (time: number) => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>BSV Testnet Faucet</CardTitle>
          <CardDescription>Request testnet BSV tokens</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between p-4 bg-secondary rounded-lg'>
            <div className='flex items-center space-x-2'>
              <Wallet className='h-5 w-5' />
              <span>Faucet Balance:</span>
            </div>
            <span className='font-bold'>{faucetBalance} satoshis</span>
          </div>

          <div className='space-y-4'>
            <Input
              placeholder='Enter BSV testnet address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              type='number'
              placeholder='Amount (in satoshis, max 100,000,000)'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max='100000000'
            />

            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={onCaptchaChange}
            />

            {remainingTime > 0 && (
              <div className='flex items-center space-x-2 text-yellow-600'>
                <Timer className='h-5 w-5' />
                <span>
                  Next request available in:{' '}
                  {formatTimeRemaining(remainingTime)}
                </span>
              </div>
            )}

            <Button
              className='w-full'
              onClick={handleRequest}
              disabled={remainingTime > 0}
            >
              Request BSV
            </Button>
          </div>

          {error && (
            <p className='text-red-500' role='alert'>
              <AlertTriangle className='inline h-4 w-4 mr-2' />
              {error}
            </p>
          )}
          {success && (
            <p className='text-green-500' role='status'>
              <History className='inline h-4 w-4 mr-2' />
              {success}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
          <CardDescription>Your last 5 requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount (satoshis)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentHistory.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {new Date(request.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{request.amount}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <a
                      href={`https://test.whatsonchain.com/tx/${request.txId}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline'
                      title={`View Transaction ${request.txId}`}
                    >
                      {request.txId.substring(0, 8)}...
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
