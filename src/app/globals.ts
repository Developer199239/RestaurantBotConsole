import { Injectable } from "@angular/core";
import { InvoiceModel } from "./models/InvoiceModel";
import { Order } from "./models/Order";

Injectable();
export class Globals {
  VAR1 = "value1";
  VAR2 = "value2";
  INVOICE_TO: InvoiceModel = new InvoiceModel();
  USER_ORDERS: Order[] = [];
}
