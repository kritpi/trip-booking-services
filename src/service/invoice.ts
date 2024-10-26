import { prisma } from "../utils/prismaClient";
// const prisma = new PrismaClient(
//   {
//     log: ["query", "info", "warn"],
//   }
// );

const createInvoice = async (
  pay_date_time: string,
  pay_price: number,
  pay_check_deposit: boolean,
  pay_check_remaining: boolean,
  user_id: string,
  trip_id: string
) => {
  const newInvoice = await prisma.invoice.create({
    data: {
      pay_date_time,
      pay_price,
      pay_check_deposit,
      pay_check_remaining,
      user: {
        connect: {
          id: user_id,
        },
      },
      trip: {
        connect: {
          id: trip_id,
        },
      },
    },
  })
}

const getInvoice = async (invoiceId: string) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    }
  })
  return invoice;
}

const getInvoiceByTripId = async (tripId: string) => {
  const invoice = await prisma.invoice.findFirst({
    where: {
      trip_id: tripId,
    }
  })
  return invoice
}

const editInvoice = async (invoiceId: string, invoice) => {
  console.log("DB Invoice Id", invoiceId);
  console.log("DB Invoice", invoice);
  await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      pay_date_time: invoice.pay_date_time,
      pay_price: invoice.pay_price,
      pay_check_deposit: invoice.pay_check_deposit,
      pay_check_remaining: invoice.pay_check_remaining
    }
  })
}

const deleteInvoice = async (invoiceId: string) => {
  await prisma.invoice.delete({
    where: {
      id: invoiceId,
    }
  })
}

export default {
  createInvoice,
  getInvoice,
  getInvoiceByTripId,
  editInvoice,
  deleteInvoice
}