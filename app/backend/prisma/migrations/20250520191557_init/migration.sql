/*
  Warnings:

  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[color_code]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_id",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Color_color_code_key" ON "Color"("color_code");
