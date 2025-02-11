import { CreateInvoiceSchema, CreateInvoiceItemSchema } from "@repo/db";
import { InvoiceService, InvoiceRepository} from "@repo/core/invoice";
import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";

const router = Router();

const InvoiceSchema = z.object({
    invoiceData: CreateInvoiceSchema,
    items: z.array(CreateInvoiceItemSchema)
});

router.post("/invoice", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const invoiceData = InvoiceSchema.parse(req.body);
        const invoiceService = new InvoiceService(new InvoiceRepository());
        await invoiceService.createInvoice(invoiceData.invoiceData, invoiceData.items);
       res.status(201).send()
    } catch (error) {
        next(error);
    }
});

router.get("/invoice", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const invoiceService = new InvoiceService(new InvoiceRepository());
        const invoices = await invoiceService.getAllInvoice();
        res.status(200).json(invoices)
    } catch (error) {
        next(error);
    }
});



export default router;
