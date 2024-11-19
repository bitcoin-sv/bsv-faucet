/*
  Warnings:

  - You are about to drop the column `requestId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_requestId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "requestId";

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "UserActivity";

-- DropTable
DROP TABLE "UserSettings";

-- DropEnum
DROP TYPE "RequestStatus";

-- DropEnum
DROP TYPE "RequestType";

-- CreateTable
CREATE TABLE "Output" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "voutIndex" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "spentStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Output_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Output" ADD CONSTRAINT "Output_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
