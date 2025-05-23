/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `flightId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('PASSENGER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'PASSENGER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_roomId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "date",
DROP COLUMN "roomId",
DROP COLUMN "timeSlot",
ADD COLUMN     "flightId" TEXT NOT NULL,
ADD COLUMN     "seat" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'PASSENGER';

-- DropTable
DROP TABLE "Room";

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,
    "seatsTotal" INTEGER NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
