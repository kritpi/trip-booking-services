"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../utils/prismaClient");
// const prisma = new PrismaClient(
//   {
//     log: ["query", "info", "warn"],
//   }
// );
const createInvoice = async (pay_date_time, pay_price, pay_check_deposit, pay_check_remaining, user_id, trip_id) => {
    const newInvoice = await prismaClient_1.prisma.invoice.create({
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
    });
};
const getInvoice = async (invoiceId) => {
    const invoice = await prismaClient_1.prisma.invoice.findUnique({
        where: {
            id: invoiceId,
        }
    });
    return invoice;
};
const getInvoiceByTripId = async (tripId) => {
    const invoice = await prismaClient_1.prisma.invoice.findFirst({
        where: {
            trip_id: tripId,
        }
    });
    return invoice;
};
const editInvoice = async (invoiceId, invoice) => {
    console.log("DB Invoice Id", invoiceId);
    console.log("DB Invoice", invoice);
    await prismaClient_1.prisma.invoice.update({
        where: {
            id: invoiceId,
        },
        data: {
            pay_date_time: invoice.pay_date_time,
            pay_price: invoice.pay_price,
            pay_check_deposit: invoice.pay_check_deposit,
            pay_check_remaining: invoice.pay_check_remaining
        }
    });
};
const deleteInvoice = async (invoiceId) => {
    await prismaClient_1.prisma.invoice.delete({
        where: {
            id: invoiceId,
        }
    });
};
exports.default = {
    createInvoice,
    getInvoice,
    getInvoiceByTripId,
    editInvoice,
    deleteInvoice
};
//# sourceMappingURL=invoice.js.map