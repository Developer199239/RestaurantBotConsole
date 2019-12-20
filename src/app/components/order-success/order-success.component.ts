import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "src/app/models/Order";
import { Globals } from "src/app/globals";
import { InvoiceModel } from "src/app/models/InvoiceModel";

@Component({
  selector: "app-order-success",
  templateUrl: "./order-success.component.html",
  styleUrls: ["./order-success.component.css"]
})
export class OrderSuccessComponent implements OnInit {
  userOrders: Order[] = [];
  invoice_to: InvoiceModel = new InvoiceModel();
  constructor(private router: Router, private globals: Globals) {
    this.invoice_to = this.globals.INVOICE_TO;
    this.userOrders = this.globals.USER_ORDERS;
  }

  ngOnInit() {
    // this.addData();
    // console.log();
  }

  gotoHomeBtnAction() {
    this.router.navigate(["/"]);
  }
}
