/*
  Warnings:

  - You are about to drop the `_AmenityToCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AmenityToCustomer" DROP CONSTRAINT "_AmenityToCustomer_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToCustomer" DROP CONSTRAINT "_AmenityToCustomer_B_fkey";

-- DropTable
DROP TABLE "_AmenityToCustomer";

-- CreateTable
CREATE TABLE "_AmenityToHeadquarter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToHeadquarter_AB_unique" ON "_AmenityToHeadquarter"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToHeadquarter_B_index" ON "_AmenityToHeadquarter"("B");

-- AddForeignKey
ALTER TABLE "_AmenityToHeadquarter" ADD CONSTRAINT "_AmenityToHeadquarter_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToHeadquarter" ADD CONSTRAINT "_AmenityToHeadquarter_B_fkey" FOREIGN KEY ("B") REFERENCES "Headquarter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
