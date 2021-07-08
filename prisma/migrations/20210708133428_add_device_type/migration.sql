/*
  Warnings:

  - Added the required column `type` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('MOBILE', 'DESKTOP', 'BROWSER');

-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "type" "DeviceType" NOT NULL;
