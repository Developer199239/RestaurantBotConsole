import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[];
  sender_id: String
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.sender_id = this.route.snapshot.paramMap.get('id');
    this.orderService.getUserOrder(String(this.sender_id)).subscribe(userOrders =>{
      console.log(userOrders);
      this.orders = userOrders;
    }, er=>{
      console.log("== get user order error "+er);
    });
  }

}
