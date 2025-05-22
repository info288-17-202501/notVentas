/*
  Warnings:

  - You are about to drop the column `addressCity` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `addressState` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `addressStreet` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `addressZip` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `colorId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Sale` table. All the data in the column will be lost.
  - The primary key for the `SaleItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `SaleItem` table. All the data in the column will be lost.
  - You are about to drop the column `saleId` on the `SaleItem` table. All the data in the column will be lost.
  - You are about to drop the column `addressCity` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `addressState` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `addressStreet` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `addressZip` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `coordLatitude` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `coordLongitude` on the `Store` table. All the data in the column will be lost.
  - The primary key for the `StoreProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `StoreProduct` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `StoreProduct` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `SaleItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_id` to the `SaleItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `StoreProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `StoreProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_userId_fkey";

-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_companyId_fkey";

-- DropForeignKey
ALTER TABLE "StoreProduct" DROP CONSTRAINT "StoreProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "StoreProduct" DROP CONSTRAINT "StoreProduct_storeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "addressCity",
DROP COLUMN "addressState",
DROP COLUMN "addressStreet",
DROP COLUMN "addressZip",
ADD COLUMN     "address_city" TEXT,
ADD COLUMN     "address_state" TEXT,
ADD COLUMN     "address_street" TEXT,
ADD COLUMN     "postal_code" INTEGER;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "colorId",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "color_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "storeId",
DROP COLUMN "userId",
ADD COLUMN     "store_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_pkey",
DROP COLUMN "productId",
DROP COLUMN "saleId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "sale_id" INTEGER NOT NULL,
ADD CONSTRAINT "SaleItem_pkey" PRIMARY KEY ("sale_id", "product_id");

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "addressCity",
DROP COLUMN "addressState",
DROP COLUMN "addressStreet",
DROP COLUMN "addressZip",
DROP COLUMN "companyId",
DROP COLUMN "coordLatitude",
DROP COLUMN "coordLongitude",
ADD COLUMN     "address_city" TEXT,
ADD COLUMN     "address_state" TEXT,
ADD COLUMN     "address_street" TEXT,
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD COLUMN     "coord_latitude" DOUBLE PRECISION,
ADD COLUMN     "coord_longitude" DOUBLE PRECISION,
ADD COLUMN     "postal_code" INTEGER;

-- AlterTable
ALTER TABLE "StoreProduct" DROP CONSTRAINT "StoreProduct_pkey",
DROP COLUMN "productId",
DROP COLUMN "storeId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "store_id" INTEGER NOT NULL,
ADD CONSTRAINT "StoreProduct_pkey" PRIMARY KEY ("store_id", "product_id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyId",
ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreProduct" ADD CONSTRAINT "StoreProduct_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreProduct" ADD CONSTRAINT "StoreProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
