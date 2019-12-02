import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import {FormGroup, FormBuilder,Validators, EmailValidator} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service'
import { User } from '../../models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetailForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user:User;
    sender_id: String
    isShow = false;  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private orderService: OrderService,private router: Router) { }

  ngOnInit() {
    this.sender_id = this.route.snapshot.paramMap.get('id');
    this.userDetailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email:[''],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      card_number: ['', Validators.required],
      security_code: ['', Validators.required],
      card_exp_month: ['', Validators.required],
      card_exp_year: ['', Validators.required],
  });
  }

// convenience getter for easy access to form fields
get f() { return this.userDetailForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userDetailForm.invalid) {
      return;
  }
  this.loading = true;
this.user = new User(this.f.name.value,this.f.email.value,this.f.address.value,this.f.phone.value,this.sender_id);
this.orderService.confirmUserOrder(this.user).subscribe(userOrders =>{
      console.log(userOrders);
      this.loading = false;
      this.router.navigate(['success'])
    }, er=>{
      console.log("== get user order error "+er);
      this.loading = false;
    });
  }

}
