-- CreateEnum
CREATE TYPE "VideoFormat" AS ENUM ('SHORT', 'STANDARD');

-- AlterEnum
ALTER TYPE "PostStatus" ADD VALUE 'DRAFT';

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_nicheId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "format" "VideoFormat",
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "trimEnd" DOUBLE PRECISION,
ADD COLUMN     "trimStart" DOUBLE PRECISION,
ALTER COLUMN "nicheId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE SET NULL ON UPDATE CASCADE;
