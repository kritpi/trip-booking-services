"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoice = exports.editInvoice = exports.getInvoiceByTripId = exports.getInvoice = exports.createInvoice = void 0;
const invoice_1 = __importDefault(require("../service/invoice"));
const createInvoice = async (req, res) => {
    const invoice = req.body;
    console.log("invoice ja", invoice);
    try {
        await invoice_1.default.createInvoice(invoice.pay_date_time, invoice.pay_price, invoice.pay_check_deposit, invoice.pay_check_remaining, invoice.user_id, invoice.trip_id);
        res.status(200).send("invoice created");
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.createInvoice = createInvoice;
const getInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    console.log("invoiceId", invoiceId);
    console.log("req.params", req.params);
    try {
        const invoice = await invoice_1.default.getInvoice(invoiceId);
        res.status(200).json(invoice);
    }
    catch (error) {
        res.status;
    }
};
exports.getInvoice = getInvoice;
const getInvoiceByTripId = async (req, res) => {
    const tripId = req.params.id;
    console.log("Trip Id", tripId);
    try {
        const invoice = await invoice_1.default.getInvoiceByTripId(tripId);
        res.status(200).json(invoice);
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.getInvoiceByTripId = getInvoiceByTripId;
const editInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    const editInvoice = req.body;
    console.log("Edit's Invoice Id", invoiceId);
    console.log("Edited Invoice", editInvoice);
    try {
        await invoice_1.default.editInvoice(invoiceId, editInvoice);
        res.status(200).send("invoice edited");
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.editInvoice = editInvoice;
const deleteInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    try {
        await invoice_1.default.deleteInvoice(invoiceId);
        res.status(200).send("invoice deleted");
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.deleteInvoice = deleteInvoice;
//# sourceMappingURL=invoice.js.map