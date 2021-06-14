/*
  Warnings:

  - You are about to drop the column `vaultid` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `vaultid` on the `key_exchanges` table. All the data in the column will be lost.
  - You are about to drop the column `vaultid` on the `keycards` table. All the data in the column will be lost.
  - You are about to drop the `vaults` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userid,safeid]` on the table `keycards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `safeid` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `safeid` to the `key_exchanges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `safeid` to the `keycards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_vaultid_fkey";

-- DropForeignKey
ALTER TABLE "key_exchanges" DROP CONSTRAINT "key_exchanges_vaultid_fkey";

-- DropForeignKey
ALTER TABLE "keycards" DROP CONSTRAINT "keycards_vaultid_fkey";

-- DropIndex
DROP INDEX "keycards.userid_vaultid_unique";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "vaultid",
ADD COLUMN     "safeid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "key_exchanges" DROP COLUMN "vaultid",
ADD COLUMN     "safeid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "keycards" DROP COLUMN "vaultid",
ADD COLUMN     "safeid" TEXT NOT NULL;

-- DropTable
DROP TABLE "vaults";

-- CreateTable
CREATE TABLE "safes" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "keycards.userid_safeid_unique" ON "keycards"("userid", "safeid");

-- AddForeignKey
ALTER TABLE "key_exchanges" ADD FOREIGN KEY ("safeid") REFERENCES "safes"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keycards" ADD FOREIGN KEY ("safeid") REFERENCES "safes"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD FOREIGN KEY ("safeid") REFERENCES "safes"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
