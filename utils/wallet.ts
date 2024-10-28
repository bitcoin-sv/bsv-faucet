import * as bitcoin from 'bitcoinjs-lib';
import { db, wallets, createWallet } from '../lib/db';
import { ECPairFactory } from 'ecpair'; // Corrected import
import * as ecc from 'tiny-secp256k1';

const ECPair = ECPairFactory(ecc);

export async function generateNewWallet() {

  const keyPair = ECPair.makeRandom({ network: bitcoin.networks.regtest });
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: bitcoin.networks.regtest });
  if (!address) {
    throw new Error('Failed to generate address');
  }

  const privateKey = keyPair.toWIF();

  const wallet = await db.insert(wallets).values({ address, privateKey }).returning();

  return wallet[0];
}
