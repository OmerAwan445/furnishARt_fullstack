/*
  Warnings:

  - You are about to drop the column `deleted` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `cart_id` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cart_id_fkey";

-- DropIndex
DROP INDEX "Order_cart_id_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cart_id";
