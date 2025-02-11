import { pgTable, serial, varchar, text, timestamp, numeric,  integer, jsonb } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

// Create a sequence starting from 4000
export const invoiceNumberSeq = sql`CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START WITH 40000`;


// Invoice table with embedded JSON data for customer and company
export const InvoiceTable = pgTable('invoices', {
  id: serial('id').primaryKey(),
  invoiceNumber: varchar('invoice_number')
    .notNull()
    .unique()
    .$defaultFn(() => sql`nextval('invoice_number_seq')::text`),
  invoiceDate: timestamp('invoice_date').notNull(),
  paymentDate: timestamp('payment_date').notNull(),
  
  billTo: jsonb('bill_to').notNull(),
  
  shipTo: jsonb('ship_to'),
  
  company: jsonb('company'),
  
  subTotal: numeric('sub_total', { precision: 10, scale: 2 }).notNull(),
  taxRate: numeric('tax_rate', { precision: 5, scale: 2 }),
  taxAmount: numeric('tax_amount', { precision: 10, scale: 2 }),
  grandTotal: numeric('grand_total', { precision: 10, scale: 2 }).notNull(),
  notes: text('notes'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Invoice Items table
export const InvoiceItemTable = pgTable('invoice_items', {
  id: serial('id').primaryKey(),
  invoiceId: integer('invoice_id').references(() => InvoiceTable.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  quantity: integer('quantity').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
});

// Relations
export const invoicesRelations = relations(InvoiceTable, ({ many }) => ({
  items: many(InvoiceItemTable),
}));

export const InvoiceItemTableRelations = relations(InvoiceItemTable, ({ one }) => ({
  invoice: one(InvoiceTable, {
    fields: [InvoiceItemTable.invoiceId],
    references: [InvoiceTable.id],
  }),
}));




export type Invoice = typeof InvoiceTable.$inferSelect;
export type NewInvoice = typeof InvoiceTable.$inferInsert;
export type UpdateInvoice = Partial<NewInvoice>;


export const InvoiceItem= typeof InvoiceItemTable.$inferSelect;
export type NewInvoiceItem = typeof InvoiceItemTable.$inferInsert;
export type UpdateInvoiceItem = Partial<NewInvoiceItem>;

// Schema
export const CreateInvoiceSchema= createInsertSchema(InvoiceTable)
export const CreateInvoiceItemSchema=createInsertSchema(InvoiceItemTable)