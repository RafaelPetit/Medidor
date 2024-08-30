/*
  Warnings:

  - You are about to drop the column `customer_code` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_code` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_customer_code_fkey";

-- DropIndex
DROP INDEX "Measure_customer_code_measure_type_measure_datetime_key";

-- DropIndex
DROP INDEX "customer_code_measure_unique";

-- AlterTable
ALTER TABLE "Measure" DROP COLUMN "customer_code",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "customer_code" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
