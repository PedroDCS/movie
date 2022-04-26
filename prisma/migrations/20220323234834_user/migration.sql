-- CreateEnum
CREATE TYPE "Region" AS ENUM ('SUL', 'SUDESTE', 'NORTE', 'NORDESTE', 'CENTRO_OESTE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "region" "Region",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
