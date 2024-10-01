/*
  Warnings:

  - You are about to drop the column `customerId` on the `OpeningHour` table. All the data in the column will be lost.
  - Added the required column `headquarterId` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OpeningHour" DROP CONSTRAINT "OpeningHour_customerId_fkey";

-- AlterTable
ALTER TABLE "OpeningHour" DROP COLUMN "customerId",
ADD COLUMN     "headquarterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_headquarterId_fkey" FOREIGN KEY ("headquarterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
