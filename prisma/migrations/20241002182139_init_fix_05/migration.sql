/*
  Warnings:

  - You are about to drop the column `icon` on the `ServiceBudget` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ServiceBudget` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `Zone` table. All the data in the column will be lost.
  - You are about to drop the `_CustomerToServiceType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `count` to the `ServiceBudget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_cityId_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToServiceType" DROP CONSTRAINT "_CustomerToServiceType_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToServiceType" DROP CONSTRAINT "_CustomerToServiceType_B_fkey";

-- AlterTable
ALTER TABLE "ServiceBudget" DROP COLUMN "icon",
DROP COLUMN "name",
ADD COLUMN     "count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Zone" DROP COLUMN "cityId",
ADD COLUMN     "cardinalPointId" INTEGER;

-- DropTable
DROP TABLE "_CustomerToServiceType";

-- CreateTable
CREATE TABLE "CardinalPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CardinalPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToServiceBudget" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CardinalPointToCity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToServiceBudget_AB_unique" ON "_CustomerToServiceBudget"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToServiceBudget_B_index" ON "_CustomerToServiceBudget"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardinalPointToCity_AB_unique" ON "_CardinalPointToCity"("A", "B");

-- CreateIndex
CREATE INDEX "_CardinalPointToCity_B_index" ON "_CardinalPointToCity"("B");

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_cardinalPointId_fkey" FOREIGN KEY ("cardinalPointId") REFERENCES "CardinalPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToServiceBudget" ADD CONSTRAINT "_CustomerToServiceBudget_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToServiceBudget" ADD CONSTRAINT "_CustomerToServiceBudget_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardinalPointToCity" ADD CONSTRAINT "_CardinalPointToCity_A_fkey" FOREIGN KEY ("A") REFERENCES "CardinalPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardinalPointToCity" ADD CONSTRAINT "_CardinalPointToCity_B_fkey" FOREIGN KEY ("B") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
