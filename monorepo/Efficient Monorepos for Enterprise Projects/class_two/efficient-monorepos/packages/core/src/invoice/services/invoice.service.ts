import { type NewInvoice, type NewInvoiceItem } from "@repo/db";
import { InvoiceRepository } from "../repositories/invoice.repository";


// Invoice Service Implementation using Singleton Pattern
export class InvoiceService {
  constructor(private readonly invoiceRepository:InvoiceRepository ){}

  // Create new invoice with items
  async createInvoice(data: NewInvoice, items: NewInvoiceItem[]) {
    const invoice= await this.invoiceRepository.create(data)
  const invoiceItems=  await this.invoiceRepository.createItems(items)
    return {invoice, items: invoiceItems}
  }


async getAllInvoice(){
  return this.invoiceRepository.findAll()
}


}
