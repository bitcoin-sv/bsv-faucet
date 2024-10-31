## Description

Create an open-source faucet service offering small amounts of digital tokens for testing purposes on the BSV Blockchain. This service aids developers and testers in their work without requiring them to acquire real digital currencies. It's applicable to non-production environments such as testnet.

A testnet faucet provides users with free testnet tokens for testing and development. This allows developers to test their applications and smart contracts before deploying them to the main network.

## Introduction

Bitcoin SV (BSV) is a blockchain that aims to maintain the original vision of Bitcoin, focusing on scalability, security, and stability. This list gathers various resources to help you explore, develop, and contribute to the BSV ecosystem.

## **Getting Started**

- [Getting Started with Bitcoin testnet](https://docs.bsvblockchain.org/network-topology/nodes/sv-node/installation/sv-node/network-environments/testnet)
- [System Requirements](https://docs.bsvblockchain.org/network-topology/nodes/sv-node/system-requirements)
  
#### BSV Quick Start

- [Quick Start](https://docs.bsvblockchain.org/intro/quick-start)
- [BSV Tools and Libraries](https://www.bsvblockchain.org/features/tools-libraries)

- [Bitcoin SV Website](https://bitcoinsv.io/)
- [Bitcoin SV Wiki](https://en.wikipedia.org/wiki/Bitcoin_SV)
- [BSV Developer Documentation](https://docs.bitcoinsv.io/)
- [BSV GitHub Repository](https://github.com/bitcoin-sv/bitcoin-sv)
- [Open Standards](https://openstandards.cash/) for industry collaboration
- [BSV Wiki](https://wiki.bitcoinsv.io/) – Aim to provide correct and up-to-date information on the Bitcoin protocol, network, and its features and functionality.
- [Paymail](https://tsc.bsvblockchain.org/standards/paymail/) – A collection of protocols for BSV blockchain wallets that allow for a set of simplified user experiences to be delivered across all wallets in the ecosystem.


#### BSV Development Libraries

- [Official BSV SDK](https://github.com/bitcoin-sv/ts-sdk) maintained by the BSV Association with zero dependencies.
- [Bitcoin SV Lib](https://github.com/moneybutton/bsv) - A pure and powerful JavaScript Bitcoin SV library. A fork of BitPay's bitcore-lib-cash, but for Bitcoin SV only. Maintained by Yours Inc.

#### Application Technology Stack

- Framework - Next.js (App Router)
- Language - TypeScript
- Auth - Auth.js
- Database - Postgres
- Deployment - Vercel
- Styling - Tailwind CSS
- Components - Shadcn UI
- Analytics - Vercel Analytics
- Formatting - Prettier

This uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.


## Pre-requisites

To successfully finish this guide, you'll need:

- Node.js
- A Vercel Account (to set up a free Postgres database and deploy the app)
- A GitHub Account (to create an OAuth app)


## Getting Started
During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

Inside the Vercel Postgres dashboard, create a table based on the schema defined in this repository.

```sh
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
```
Then, uncomment app/api/seed.ts and hit http://localhost:3000/api/seed to seed the database

Next, copy the .env.example file to .env and update the values. Follow the instructions in the .env.example file to set up your env variables.

```sh
npm i -g vercel
vercel link
vercel env pull
```

Finally, run the following commands to start the development server:

```sh
pnpm install
pnpm dev
```

You'll need the the following BSV Libraries:
```sh
npm i @bsv/sdk
```

You should now be able to access the application at http://localhost:3000.


## Database Schema Management
Maintaining a consistent PostgreSQL database schema is crucial for collaboration among all contributors.

This section outlines the process for managing schema changes, creating migration scripts, and ensuring everyone is on the same page.

#### Creating Migration Scripts

Use a migration tool Knex.js

To create a migration script, run the following command in your terminal:

```sh
bash
npx knex migrate:make <migration_name>
```

Replace <migration_name> with a descriptive name reflecting the changes being made (e.g., create_users_table).

#### Editing Migration Scripts

Open the newly created migration file in the migrations directory. You’ll find two functions: up and down.
In the up function, add the SQL commands to create or modify tables. In the down function, add commands to revert these changes. For example:


```jv
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

#### Testing Migrations Locally

Before pushing changes, run your migration scripts locally to ensure they work as expected. Use the following command:
bash

```sh
npx knex migrate:latest
```

This will apply all pending migrations to your local database. You can revert changes using:
```sh
bash

npx knex migrate:rollback
```

#### Creating a Pull Request

After testing your migration scripts, create a pull request (PR) in the repository:
Include a concise description of the schema changes.
List the migration scripts included in the PR.
Reference any discussions related to your changes.
Tag other contributors for review.

#### Merging Changes

Once the PR is approved, merge the changes into the main branch. After merging, make sure to run the migration scripts on the shared development database hosted on Vercel.
Applying Migrations in Vercel

After merging your PR, ensure that the migration scripts are executed on the Vercel DB. You can run migrations by adding a script in your package.json:
```sh
Copy code
"scripts": {
  "migrate": "knex migrate:latest --env production"
}
```

Run the migration command on Vercel using:
```sh
bash
Copy code
npm run migrate
```

#### Documenting Changes

Update the README or project wiki to reflect any changes to the schema, including new tables, fields, or relationships.
