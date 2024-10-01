/*
  Warnings:

  - You are about to drop the column `image` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `logo` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Headquarter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "image",
ADD COLUMN     "logo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Headquarter" ADD COLUMN     "image" TEXT NOT NULL;
