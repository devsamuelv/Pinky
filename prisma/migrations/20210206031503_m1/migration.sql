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

-- CreateTable
CREATE TABLE "Blocklist" (
    "word" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ignore" (
    "channelId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Watch" (
    "UsernameAndTag" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Frozen.username_unique" ON "Frozen"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Blocklist.word_unique" ON "Blocklist"("word");

-- CreateIndex
CREATE UNIQUE INDEX "Ignore.channelId_unique" ON "Ignore"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Watch.UsernameAndTag_unique" ON "Watch"("UsernameAndTag");
