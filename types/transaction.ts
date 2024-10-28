export interface BeefTransaction {
  inputs: Array<{ txid: string; vout: number; scriptSig: string }>;
  outputs: Array<{ address: string; amount_satoshis: bigint }>;
}

export interface Transaction {
  date: Date;
  txid: string;
  raw_tx: string;
  beef_tx: BeefTransaction;
  vout: number;
  tx_type: 'incoming' | 'outgoing';
  spent_status: boolean;
  testnet_flag: boolean;
  amount_satoshis: bigint;
}
