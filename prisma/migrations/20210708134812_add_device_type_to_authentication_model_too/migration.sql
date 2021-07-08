/*
  Warnings:

  - Added the required column `type` to the `authentication_process` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authentication_process" ADD COLUMN     "type" "DeviceType" NOT NULL;
