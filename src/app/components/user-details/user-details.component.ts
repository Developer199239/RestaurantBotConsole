import { Component, OnInit, ViewChild, AfterViewChecked } from "@angular/core";
import { from } from "rxjs";
import {
  FormGroup,
  FormBuilder,
  Validators,
  EmailValidator
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "../../services/order.service";
import { User } from "../../models/User";
import { SuccessModel } from "../../models/SuccessModel";
import { environment } from "src/environments/environment";
import { Globals } from "src/app/globals";
import { InvoiceModel } from "src/app/models/InvoiceModel";
declare let paypal: any;

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit, AfterViewChecked {
  userDetailForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  sender_id: String;
  isShow = false;
  successModel: SuccessModel;
  // paypal variable
  isShowPaypalPaymentView = false;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount = 1;
  paymentId: String;
  cardId: String;
  mobiel_pattern = "^((\\+91-?)|0)?[0-9]{10}$";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private globals: Globals
  ) {}

  ngOnInit() {
    this.sender_id = this.route.snapshot.paramMap.get("id");
    this.userDetailForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      phone: [
        "",
        [Validators.required, Validators.pattern("^((\\01-?)|+)?[0-9]$")]
      ]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userDetailForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userDetailForm.invalid) {
      return;
    }

    this.loading = true;

    this.isShowPaypalPaymentView = true;
    //now block this for testing
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "#paypal-checkout-btn");
        this.paypalLoad = false;
      });
    }
    // this.userInfoUpdateServiceCallDev();
  }

  userInfoUpdateServiceCall() {
    this.user = new User(
      this.f.name.value,
      this.f.email.value,
      this.f.address.value,
      this.f.phone.value,
      this.sender_id,
      this.paymentId,
      this.cardId
    );
    this.orderService.confirmUserOrder(this.user).subscribe(
      response => {
        this.successModel = response;
        this.loading = false;
        if (this.successModel.success) {
          let invoiceModel = this.globals.INVOICE_TO;
          invoiceModel.orderId = this.sender_id;
          invoiceModel.name = this.f.name.value;
          invoiceModel.email = this.f.address.value;
          invoiceModel.phone = this.f.phone.value;
          invoiceModel.address = this.f.address.value;
          invoiceModel.paymentMethod = "Card";
          this.globals.INVOICE_TO = invoiceModel;
          this.router.navigate(["success"]);
        } else {
          this.router.navigate(["notfound"]);
        }
      },
      er => {
        console.log("== get user order error " + er);
        this.loading = false;
        //todo failed handle and show message
        this.router.navigate(["notfound"]);
      }
    );
  }

  userInfoUpdateServiceCallDev() {
    this.user = new User(
      this.f.name.value,
      this.f.email.value,
      this.f.address.value,
      this.f.phone.value,
      this.sender_id,
      this.paymentId,
      this.cardId
    );
    let invoiceModel = this.globals.INVOICE_TO;
    invoiceModel.orderId = this.sender_id;
    invoiceModel.name = this.f.name.value;
    invoiceModel.email = this.f.address.value;
    invoiceModel.phone = this.f.phone.value;
    invoiceModel.address = this.f.address.value;
    invoiceModel.paymentMethod = "Card";
    this.globals.INVOICE_TO = invoiceModel;
    this.router.navigate(["success"]);
  }

  // paypal implement
  paypalConfig = {
    env: "sandbox",
    client: {
      sandbox: environment.paypal.client
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: this.globals.TOTAL_COST,
                currency: environment.paypal.currency
              }
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        console.log("payment success");
        // console.log(payment);
        this.paymentId = payment["id"];
        this.cardId = payment["cart"];
        console.log("after payment success");
        this.userInfoUpdateServiceCall();
      });
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
      let scripttagElement = document.createElement("script");
      scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
