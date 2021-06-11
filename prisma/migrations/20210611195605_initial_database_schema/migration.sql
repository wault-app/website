-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('OWNER', 'WRITER', 'READER');

-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "devices" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "loggedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rsaKey" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "key_exchanges" (
    "_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceid" TEXT NOT NULL,
    "vaultid" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "keycards" (
    "_id" TEXT NOT NULL,
    "role" "RoleType" NOT NULL,
    "userid" TEXT NOT NULL,
    "vaultid" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "vaults" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "authentication_process" (
    "_id" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "rsa" TEXT NOT NULL,
    "userid" TEXT,
    "deviceid" TEXT,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "vaultid" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "keycards.userid_vaultid_unique" ON "keycards"("userid", "vaultid");

-- CreateIndex
CREATE UNIQUE INDEX "authentication_process_deviceid_unique" ON "authentication_process"("deviceid");

-- AddForeignKey
ALTER TABLE "authentication_process" ADD FOREIGN KEY ("userid") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authentication_process" ADD FOREIGN KEY ("deviceid") REFERENCES "devices"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD FOREIGN KEY ("vaultid") REFERENCES "vaults"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_exchanges" ADD FOREIGN KEY ("deviceid") REFERENCES "devices"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_exchanges" ADD FOREIGN KEY ("vaultid") REFERENCES "vaults"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keycards" ADD FOREIGN KEY ("userid") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keycards" ADD FOREIGN KEY ("vaultid") REFERENCES "vaults"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD FOREIGN KEY ("userid") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
