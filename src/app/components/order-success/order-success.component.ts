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

  addData() {
    let dummyOrder = new Order();
    dummyOrder.item_name = "Bangladeshi pizza 1";
    dummyOrder.discount = "g";
    dummyOrder.total_price = "$50";
    this.userOrders.push(dummyOrder);

    dummyOrder = new Order();
    dummyOrder.item_name = "Bangladeshi pizza 2";
    dummyOrder.discount = "g";
    dummyOrder.total_price = "$20";
    this.userOrders.push(dummyOrder);

    dummyOrder = new Order();
    dummyOrder.item_name = "Bangladeshi pizza 3";
    dummyOrder.discount = "g";
    dummyOrder.total_price = "$10";
    this.userOrders.push(dummyOrder);

    dummyOrder = new Order();
    dummyOrder.item_name = "Total Amount:";
    dummyOrder.total_price = "$10";
    dummyOrder.discount = "g";
    this.userOrders.push(dummyOrder);

    dummyOrder = new Order();
    dummyOrder.item_name = "Discount Amount:";
    dummyOrder.total_price = "$100";
    dummyOrder.discount = "d";
    this.userOrders.push(dummyOrder);

    dummyOrder = new Order();
    dummyOrder.item_name = "Total:";
    dummyOrder.total_price = "$50";
    dummyOrder.discount = "t";
    this.userOrders.push(dummyOrder);
  }

  gotoHomeBtnAction() {
    this.router.navigate(["/"]);
  }
}
