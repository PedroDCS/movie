/*
  Warnings:

  - You are about to drop the column `region` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParentalGuidance" AS ENUM ('GENERAL_AUDIENCE', 'PARENTAL_GUIDANCE_SUGGESTED', 'PARENTAL_STRONGLY_CAUTIONED', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "Room" AS ENUM ('IMAX', 'STANDART', 'VIP', 'D_LUX', 'D_BOX');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('STANDART', 'HALF_PRICE', 'FREE', 'PROMOTION');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('BLOCKED', 'AVALIABLE', 'SELECTED', 'BUSY');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('STANDART', 'WHEELCHAIR', 'REDUCED_MOBILITY', 'OVERWEIGHT');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINSTRATOR', 'USER', 'REVIWER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "region",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "rule" "UserRole" NOT NULL DEFAULT E'USER';

-- DropEnum
DROP TYPE "Region";

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "parental_guidance" "ParentalGuidance" NOT NULL DEFAULT E'GENERAL_AUDIENCE',
    "thumbnail" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "languages" TEXT[],

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionSeat" (
    "id" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "colum" INTEGER NOT NULL,
    "status" "SeatStatus" NOT NULL DEFAULT E'AVALIABLE',
    "type" "SeatType" NOT NULL DEFAULT E'STANDART',
    "sessionId" TEXT,

    CONSTRAINT "SessionSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "room" "Room" NOT NULL,
    "caption" BOOLEAN NOT NULL DEFAULT false,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "type" "TicketType" NOT NULL DEFAULT E'STANDART',
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionSeat" ADD CONSTRAINT "SessionSeat_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
