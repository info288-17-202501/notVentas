/*
  Warnings:

  - The primary key for the `StoreProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `color_id` on table `StoreProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StoreProduct" DROP CONSTRAINT "StoreProduct_color_id_fkey";

-- AlterTable
ALTER TABLE "StoreProduct" DROP CONSTRAINT "StoreProduct_pkey",
ALTER COLUMN "color_id" SET NOT NULL,
ADD CONSTRAINT "StoreProduct_pkey" PRIMARY KEY ("store_id", "product_id", "color_id");

-- AddForeignKey
ALTER TABLE "StoreProduct" ADD CONSTRAINT "StoreProduct_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
