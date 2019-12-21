import { Component, OnInit } from "@angular/core";
import { Order } from "../../models/Order";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "../../services/order.service";
import { Globals } from "src/app/globals";
import { InvoiceModel } from "src/app/models/InvoiceModel";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"]
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[];
  sender_id: String;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private globals: Globals,
    private router: Router
  ) {}

  ngOnInit() {
    this.sender_id = this.route.snapshot.paramMap.get("id");
    this.orderService.getUserOrder(String(this.sender_id)).subscribe(
      userOrders => {
        console.log(userOrders);
        let array_length = userOrders.length - 1;
        //--- get last row for user info----
        let user_info = userOrders[array_length];
        let invoiceModel = this.globals.INVOICE_TO;
        invoiceModel.deliveryType = user_info.item_name;
        //---- set invoice info---
        this.globals.INVOICE_TO = invoiceModel;
        //--- remove last row that is user info--
        userOrders.splice(array_length, 1);

        this.orders = userOrders;
        let myOrders: Order[] = [];
        let len = this.orders.length;
        for (let i = 0; i < len - 1; i++) {
          let item = this.orders[i];
          let row = new Order();
          row.item_name = item.item_name;
          row.discount = "g";
          row.total_price = item.price;
          myOrders.push(row);
        }

        let item = this.orders[len - 1];

        let row = new Order();
        row.item_name = "Discount Amount:";
        row.total_price = item.total_price;
        row.discount = "d";
        myOrders.push(row);

        row = new Order();
        row.item_name = "Total:";
        row.discount = "t";
        row.total_price = item.total_price;
        myOrders.push(row);
        this.globals.USER_ORDERS = myOrders;
      },
      er => {
        console.log("== get user order error " + er);
        this.router.navigate(["notfound"]);
      }
    );
  }
}
