import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  userOrders: Order[] = [];
  invoice_to = {}
  constructor(private router: Router, private globals: Globals) { 
    
    
  }

  ngOnInit() {
    this.addData()
  }


  addData(){
    let dummyOrder = new Order()
    dummyOrder.item_name = "Bangladeshi pizza 1";
    dummyOrder.discount = "g";
    dummyOrder.total_price = "$50";
    this.userOrders.push(dummyOrder)

    dummyOrder = new Order()
    dummyOrder.item_name = "Bangladeshi pizza 2";
    dummyOrder.discount = "g";
    dummyOrder.total_price = "$20";
    this.userOrders.push(dummyOrder)

    dummyOrder = new Order()
    dummyOrder.item_name = "Bangladeshi pizza 3";
    dummyOrder.discount = "g";
    dummyOrder.total_price = "$10";
    this.userOrders.push(dummyOrder)

    dummyOrder = new Order()
    dummyOrder.item_name = "Total Amount:";
    dummyOrder.total_price = "$10";
    dummyOrder.discount = "g";
    this.userOrders.push(dummyOrder)

    dummyOrder = new Order()
    dummyOrder.item_name = "Discount Amount:";
    dummyOrder.total_price = "$100";
    dummyOrder.discount = "d";
    this.userOrders.push(dummyOrder)

    dummyOrder = new Order()
    dummyOrder.item_name = "Total:";
    dummyOrder.total_price = "$50";
    dummyOrder.discount = "t";
    this.userOrders.push(dummyOrder)
    
    let invoice_to_temp = {
        'order_id':'#123',
        'name': 'Murtuza Rahman',
        'email': 'murtuza@gamil.com',
        'phone': '01982',
        'address': 'Dhaka, palton',
        'delivery_type' : 'On table',
        'payment_method' : 'Card'
    };

    this.globals.INVOICE_TO = invoice_to_temp;
    this.invoice_to = this.globals.INVOICE_TO;


  }

  gotoHomeBtnAction(){
    this.router.navigate(['/'])
  }

}
