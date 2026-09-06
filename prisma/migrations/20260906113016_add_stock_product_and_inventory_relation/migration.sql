-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "inventoryId" TEXT,
ADD COLUMN     "stock_product" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
