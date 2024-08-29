/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `customerCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Measurement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Measure_Type" AS ENUM ('WATER', 'GAS');

-- DropForeignKey
ALTER TABLE "Measurement" DROP CONSTRAINT "Measurement_userId_fkey";

-- DropIndex
DROP INDEX "User_customerCode_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "customerCode",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Measurement";

-- DropEnum
DROP TYPE "MeasurementType";

-- CreateTable
CREATE TABLE "Measure" (
    "id" SERIAL NOT NULL,
    "measure_uuid" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_value" DOUBLE PRECISION NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "measure_type" "Measure_Type" NOT NULL,
    "status" "Status" NOT NULL,
    "customer_code" INTEGER NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_measure_uuid_key" ON "Measure"("measure_uuid");

-- CreateIndex
CREATE INDEX "customer_code_measure_unique" ON "Measure"("customer_code", "measure_type", "measure_datetime");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_customer_code_measure_type_measure_datetime_key" ON "Measure"("customer_code", "measure_type", "measure_datetime");

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
