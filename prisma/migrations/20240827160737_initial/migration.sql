-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "customerCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" SERIAL NOT NULL,
    "measurementType" "MeasurementType" NOT NULL,
    "value" INTEGER NOT NULL,
    "measurementDatetime" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_customerCode_key" ON "User"("customerCode");

-- CreateIndex
CREATE INDEX "user_measurement_unique" ON "Measurement"("userId", "measurementType", "measurementDatetime");

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_userId_measurementType_measurementDatetime_key" ON "Measurement"("userId", "measurementType", "measurementDatetime");

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
