/*
  Warnings:

  - You are about to drop the `_CategoryToCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToCustomer" DROP CONSTRAINT "_CategoryToCustomer_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCustomer" DROP CONSTRAINT "_CategoryToCustomer_B_fkey";

-- DropTable
DROP TABLE "_CategoryToCustomer";

-- CreateTable
CREATE TABLE "_CategoryToHeadquarter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToHeadquarter_AB_unique" ON "_CategoryToHeadquarter"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToHeadquarter_B_index" ON "_CategoryToHeadquarter"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToHeadquarter" ADD CONSTRAINT "_CategoryToHeadquarter_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToHeadquarter" ADD CONSTRAINT "_CategoryToHeadquarter_B_fkey" FOREIGN KEY ("B") REFERENCES "Headquarter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
