-- CreateEnum
CREATE TYPE "IconType" AS ENUM ('EMOJI', 'IMAGE');

-- CreateTable
CREATE TABLE "icons" (
    "_id" TEXT NOT NULL,
    "type" "IconType" NOT NULL,
    "value" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "icons_userId_unique" ON "icons"("userId");

-- AddForeignKey
ALTER TABLE "icons" ADD FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
