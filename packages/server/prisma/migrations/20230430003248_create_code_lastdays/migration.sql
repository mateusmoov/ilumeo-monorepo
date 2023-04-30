-- CreateTable
CREATE TABLE "codes" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "last_days" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),
    "codeId" INTEGER,

    CONSTRAINT "last_days_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "last_days" ADD CONSTRAINT "last_days_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
