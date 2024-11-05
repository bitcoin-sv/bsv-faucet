import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      userId: 'user_XXXXXXXXXXXXXXXXXXXXXXXXXXX', // replace with your own clerk user
      username: 'username',
      email: 'username@gmail.com',
      imageUrl: '/placeholder-user.jpg',
      role: 'admin',
      password: 'password'
    }
  });
  await prisma.transaction.createMany({
    data: [
      {
        date: '2024-11-01T00:00:00Z',
        txid: 'd94f2de35705ec1a89cca9d9cb4bef07d3d7eab5facaa2ba0d6738e0a633430f',
        beefTx: {
          txid: 'd94f2de35705ec1a89cca9d9cb4bef07d3d7eab5facaa2ba0d6738e0a633430f'
        },
        vout: [
          {
            address: process.env.TREASURY_WALLET_WIF,
            satoshis: 1
          }
        ],
        txType: 'incoming',
        amount: 1,
        userId: user.id
      },
      {
        date: '2024-11-02T00:00:00Z',
        txid: '322f5922490eedf269e6698d148241bd32afa006864b71111141b1ed42fb15fa',
        beefTx: {
          txid: '322f5922490eedf269e6698d148241bd32afa006864b71111141b1ed42fb15fa'
        },
        vout: [
          {
            address: process.env.TREASURY_WALLET_WIF,
            satoshis: 2
          }
        ],
        txType: 'incoming',
        amount: 2,
        userId: user.id
      },
      {
        date: '2024-11-03T00:00:00Z',
        txid: '3b29125d868abdbeacb9b045a7722587253f9c33d25729a433e221191399035e',
        beefTx: {
          txid: '3b29125d868abdbeacb9b045a7722587253f9c33d25729a433e221191399035e'
        },
        vout: [
          {
            address: process.env.TREASURY_WALLET_WIF,
            satoshis: 3
          }
        ],
        txType: 'incoming',
        amount: 3,
        userId: user.id
      },
      {
        date: '2024-11-04T00:00:00Z',
        txid: 'd1649e77d87cd3253217efe2919e2dd1ed3c96069926ea9adeba1ee234e8e387',
        beefTx: {
          txid: 'd1649e77d87cd3253217efe2919e2dd1ed3c96069926ea9adeba1ee234e8e387'
        },
        vout: [
          {
            address: process.env.TREASURY_WALLET_WIF,
            satoshis: 4
          }
        ],
        txType: 'incoming',
        amount: 4,
        userId: user.id
      },
      {
        date: '2024-11-05T00:00:00Z',
        txid: '63d5325db04c2323e5914e4b28dc49410069d1ce78df776b28fdd9edd6b15d04',
        beefTx: {
          txid: '63d5325db04c2323e5914e4b28dc49410069d1ce78df776b28fdd9edd6b15d04'
        },
        vout: [
          {
            address: process.env.TREASURY_WALLET_WIF,
            satoshis: 5
          }
        ],
        txType: 'incoming',
        amount: 5,
        userId: user.id
      },
      {
        date: '2024-11-06T00:00:00Z',
        txid: 'a2bf3262e026af77813f9a6762468a3548f2310aa22e940a00ca8606a8c1e909',
        beefTx: {
          txid: 'a2bf3262e026af77813f9a6762468a3548f2310aa22e940a00ca8606a8c1e909'
        },
        vout: [
          {
            address: process.env.TREASURY_WALLET_WIF,
            satoshis: 6
          }
        ],
        txType: 'incoming',
        amount: 6,
        userId: user.id
      }
    ]
  });
  return Response.json({
    message: 'Uncomment to seed data after DB is set up.'
  });

  // await db.insert(products).values([
  //   {
  //     id: 1,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
  //     name: 'Smartphone X Pro',
  //     status: 'active',
  //     price: '999.00',
  //     stock: 150,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
  //     name: 'Wireless Earbuds Ultra',
  //     status: 'active',
  //     price: '199.00',
  //     stock: 300,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 3,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
  //     name: 'Smart Home Hub',
  //     status: 'active',
  //     price: '149.00',
  //     stock: 200,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 4,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
  //     name: '4K Ultra HD Smart TV',
  //     status: 'active',
  //     price: '799.00',
  //     stock: 50,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 5,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
  //     name: 'Gaming Laptop Pro',
  //     status: 'active',
  //     price: '1299.00',
  //     stock: 75,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 6,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
  //     name: 'VR Headset Plus',
  //     status: 'active',
  //     price: '349.00',
  //     stock: 120,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 7,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
  //     name: 'Smartwatch Elite',
  //     status: 'active',
  //     price: '249.00',
  //     stock: 250,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 8,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
  //     name: 'Bluetooth Speaker Max',
  //     status: 'active',
  //     price: '99.00',
  //     stock: 400,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 9,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
  //     name: 'Portable Charger Super',
  //     status: 'active',
  //     price: '59.00',
  //     stock: 500,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 10,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
  //     name: 'Smart Thermostat Pro',
  //     status: 'active',
  //     price: '199.00',
  //     stock: 175,
  //     availableAt: new Date()
  //   }
  // ]);
}
