-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "altPhoneNumber" DROP NOT NULL,
ADD CONSTRAINT "Driver_pkey" PRIMARY KEY ("id");
