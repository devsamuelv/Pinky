/*
  Warnings:

  - The migration will change the primary key for the `Blocklist` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Blocklist` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[word]` on the table `Blocklist`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Blocklist" DROP CONSTRAINT "Blocklist_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "Frozen" (
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Frozen.username_unique" ON "Frozen"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Blocklist.word_unique" ON "Blocklist"("word");
