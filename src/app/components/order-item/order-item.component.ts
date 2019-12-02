import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service'
import { from } from 'rxjs';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  sender_id:String
  userOrders: Order[];
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.sender_id = this.route.snapshot.paramMap.get('id');
  }

}
