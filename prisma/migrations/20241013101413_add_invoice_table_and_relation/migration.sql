-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "pay_date_time" TIMESTAMP(3) NOT NULL,
    "pay_price" DOUBLE PRECISION NOT NULL,
    "pay_check_deposit" BOOLEAN NOT NULL,
    "pay_check_remaining" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
