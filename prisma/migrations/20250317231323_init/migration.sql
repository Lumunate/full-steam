-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "specialNotes" TEXT;

-- CreateTable
CREATE TABLE "UpdateRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestType" TEXT NOT NULL,
    "requestData" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "adminComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UpdateRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpdateRequest" ADD CONSTRAINT "UpdateRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
