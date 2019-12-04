import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { from } from 'rxjs';
import {FormGroup, FormBuilder,Validators, EmailValidator} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service'
import { User } from '../../models/User';
import { SuccessModel } from '../../models/SuccessModel'
import { environment } from 'src/environments/environment';
declare let paypal: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewChecked {

  userDetailForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user:User;
    sender_id: String
    isShow = false;  
    successModel: SuccessModel;
    // paypal variable
    isShowPaypalPaymentView = false; 
    addScript: boolean = false;
    paypalLoad: boolean = true;
    finalAmount = 1;
    paymentId:String;
    cardId:String;
    

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private orderService: OrderService,private router: Router) { }

  ngOnInit() {
    this.sender_id = this.route.snapshot.paramMap.get('id');
    this.userDetailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email:[''],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      // card_number: ['', Validators.required],
      // security_code: ['', Validators.required],
      // card_exp_month: ['', Validators.required],
      // card_exp_year: ['', Validators.required],
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

    this.isShowPaypalPaymentView = true; 
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  userInfoUpdateServiceCall(){
  this.user = new User(this.f.name.value,this.f.email.value,this.f.address.value,this.f.phone.value,this.sender_id,this.paymentId,this.cardId);
  this.orderService.confirmUserOrder(this.user).subscribe(response =>{
      this.successModel = response;
      this.loading = false;
      if(this.successModel.success) {
        this.router.navigate(['success'])
      } else {
          //todo failed handle and show message
      }
    }, er=>{
      console.log("== get user order error "+er);
      this.loading = false;
      //todo failed handle and show message
    });
  }

  // paypal implement
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: environment.paypal.client
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: environment.paypal.currency } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log("payment success");  
        // console.log(payment);
        this.paymentId = payment['id'];
        this.cardId = payment['cart'];
        console.log("after payment success");
        this.userInfoUpdateServiceCall()  
        
      })
    }
  };
 
  ngAfterViewChecked(): void {
    // if (!this.addScript) {
    //   this.addPaypalScript().then(() => {
    //     paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
    //     this.paypalLoad = false;
    //   })
    // }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


}
