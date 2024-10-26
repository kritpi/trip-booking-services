import { Request, Response } from "express";
import invoiceServices from "../service/invoice";

export const createInvoice = async (req: Request, res: Response) => {
  const invoice = req.body;
  console.log("invoice ja", invoice);

  try {
    await invoiceServices.createInvoice(
      invoice.pay_date_time,
      invoice.pay_price,
      invoice.pay_check_deposit,
      invoice.pay_check_remaining,
      invoice.user_id,
      invoice.trip_id
    );
    res.status(200).send("invoice created");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.id;
  console.log("invoiceId", invoiceId);
  console.log("req.params", req.params);

  try {
    const invoice = await invoiceServices.getInvoice(invoiceId);
    res.status(200).json(invoice);
  } catch (error) {
    res.status;
  }
};

export const getInvoiceByTripId = async (req: Request, res: Response) => {
  const tripId = req.params.id;
  console.log("Trip Id", tripId);
  try {
    const invoice = await invoiceServices.getInvoiceByTripId(tripId);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).send(error);
  }
}

export const editInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.id;
  const editInvoice = req.body;
  console.log("Edit's Invoice Id", invoiceId);
  console.log("Edited Invoice", editInvoice);
  
  try {
    await invoiceServices.editInvoice(invoiceId, editInvoice);
    res.status(200).send("invoice edited");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.id;
  try {
    await invoiceServices.deleteInvoice(invoiceId);
    res.status(200).send("invoice deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};
