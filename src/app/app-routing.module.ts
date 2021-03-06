import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { MainComponent } from "./components/main/main.component";
import { OrderItemComponent } from "./components/order-item/order-item.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { PaypalComponent } from "./components/paypal/paypal.component";
import { NotFoundPageComponent } from "./components/not-found-page/not-found-page.component";

const routes: Routes = [
  { path: "", component: MainComponent, pathMatch: "full" },
  // { path: 'order', component: OrderDetailsComponent, pathMatch: 'full' },
  { path: "order/:id", component: OrderItemComponent, pathMatch: "full" },
  { path: "success", component: OrderSuccessComponent, pathMatch: "full" },
  { path: "paypal", component: PaypalComponent, pathMatch: "full" },
  { path: "notfound", component: NotFoundPageComponent, pathMatch: "full" },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
