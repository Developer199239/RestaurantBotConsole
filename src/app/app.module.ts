import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderIdMissingComponent } from './components/order-id-missing/order-id-missing.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { MainComponent} from './components/main/main.component';
import { PaypalComponent } from './components/paypal/paypal.component'
import { Globals } from './globals';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
@NgModule({
  declarations: [
    AppComponent,
    OrderDetailsComponent,
    UserDetailsComponent,
    OrderSuccessComponent,
    OrderIdMissingComponent,
    OrderItemComponent,
    MainComponent,
    PaypalComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
