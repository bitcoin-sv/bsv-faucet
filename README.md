## Description

Create an open-source faucet service offering small amounts of digital tokens for testing purposes on the BSV Blockchain. This service aids developers and testers in their work without requiring them to acquire real digital currencies. It's applicable to non-production environments such as testnet.

A testnet faucet provides users with free testnet tokens for testing and development. This allows developers to test their applications and smart contracts before deploying them to the main network.

## Contents

- Introduction
- Getting Started
- Development Libraries
- Application Technology Stack
- Pre-requisites
- Steps to get started
- 

## Introduction

Bitcoin SV (BSV) is a blockchain that aims to maintain the original vision of Bitcoin, focusing on scalability, security, and stability. This list gathers various resources to help you explore, develop, and contribute to the BSV ecosystem.

## **Getting Started**

- [Getting Started with Bitcoin testnet] (https://docs.bsvblockchain.org/network-topology/nodes/sv-node/installation/sv-node/network-environments/testnet)
- [System Requirements] (https://docs.bsvblockchain.org/network-topology/nodes/sv-node/system-requirements)



## BSV Quick Start

https://docs.bsvblockchain.org/intro/quick-start
https://www.bsvblockchain.org/features/tools-libraries

- [Bitcoin SV Website](https://bitcoinsv.io/)
- [Bitcoin SV Wiki](https://en.wikipedia.org/wiki/Bitcoin_SV)
- [BSV Developer Documentation](https://docs.bitcoinsv.io/)
- [BSV GitHub Repository](https://github.com/bitcoin-sv/bitcoin-sv)
- [Open Standards](https://openstandards.cash/) for industry collaboration
- [BSV Wiki](https://wiki.bitcoinsv.io/) – Aim to provide correct and up-to-date information on the Bitcoin protocol, network, and its features and functionality.
- [Paymail](https://tsc.bsvblockchain.org/standards/paymail/) – A collection of protocols for BSV blockchain wallets that allow for a set of simplified user experiences to be delivered across all wallets in the ecosystem.


## Development Libraries

- [Official BSV SDK](https://github.com/bitcoin-sv/ts-sdk) maintained by the BSV Association with zero dependencies.
- [Bitcoin SV Lib](https://github.com/moneybutton/bsv) - A pure and powerful JavaScript Bitcoin SV library. A fork of BitPay's bitcore-lib-cash, but for Bitcoin SV only. Maintained by Yours Inc.

## Application Technology Stack

[**Fullstack App with Next.js, Prisma, and Vercel Postgres**](https://vercel.com/guides/nextjs-prisma-postgres#how-to-build-a-fullstack-app-with-next.js-prisma-and-vercel-postgres)

Create a fullstack application with Next.js, Prisma, Vercel Postgres, and deploy to Vercel

---

[Prisma](https://prisma.io/) is a next-generation ORM that can be used to access a database in Node.js and TypeScript applications.

- [Next.js](https://nextjs.org/) as the React framework
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) for server-side API routes as the backend
- [Prisma](https://prisma.io/) as the ORM for migrations and database access
- [Vercel Postgres](https://vercel.com/storage/postgres) as the database
- [NextAuth.js](https://next-auth.js.org/) for authentication via GitHub (OAuth)
- [TypeScript](https://www.typescriptlang.org/) as the programming language
- [Vercel](http://vercel.com/) deployment

## Pre-requisites

To successfully finish this guide, you'll need:

- Node.js
- A Vercel Account (to set up a free Postgres database and deploy the app)
- A GitHub Account (to create an OAuth app)

## Steps to get started.

## Overview

Framework - Next.js (App Router)
Language - TypeScript
Auth - Auth.js
Database - Postgres
Deployment - Vercel
Styling - Tailwind CSS
Components - Shadcn UI
Analytics - Vercel Analytics
Formatting - Prettier
This uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started
During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

Inside the Vercel Postgres dashboard, create a table based on the schema defined in this repository.


CREATE TYPE status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  available_at TIMESTAMP NOT NULL
);
Then, uncomment app/api/seed.ts and hit http://localhost:3000/api/seed to seed the database with products.

Next, copy the .env.example file to .env and update the values. Follow the instructions in the .env.example file to set up your GitHub OAuth application.


npm i -g vercel
vercel link
vercel env pull
Finally, run the following commands to start the development server:


pnpm install
pnpm dev
You should now be able to access the application at http://localhost:3000.
