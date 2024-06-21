/*
  Warnings:

  - A unique constraint covering the columns `[furniture_item_id,cart_id]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FurnitureItem" ADD COLUMN     "image_urls" TEXT[],
ADD COLUMN     "total_sales" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "model_3d_url" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_furniture_item_id_cart_id_key" ON "CartItem"("furniture_item_id", "cart_id");
