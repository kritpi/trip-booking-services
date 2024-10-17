import { Request, Response } from "express";
import invoiceServices from "../service/invoice";

export const createInvoice = async (req: Request, res: Response) => {
  const invoice = req.body;
  console.log("invoice", invoice);

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

export const editInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.id;
  const editInvoice = req.body;
  try {
    await invoiceServices.editInvoice(invoiceId, editInvoice);
    res.status(200).send("invoice edited");
  } catch (error) {
    res.status;
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
