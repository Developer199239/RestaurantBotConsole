import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { Order } from '../models/Order';
import { User } from '../models/User'
// import 'rxjs/add/operator/map'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = 'http://localhost:5000/';

  constructor(private http:HttpClient) { }

  getUserOrder(sender_id:string):Observable<Order[]>{
    // this.http.get<any>(`${this.baseUrl}getUserOrder/12`).subscribe(data => {
    //   return data
    // }, er =>{
    //   console.log("error = ",er)
    //   return null
    // })
    return this.http.get<Order[]>(`${this.baseUrl}getUserOrder/${sender_id}`);
  }
  

  // confirmUserOrder(user:User) {
  //     console.log(user);
  //     this.http.post<any>(`${this.baseUrl}confirmUserOrder`, user, httpOptions)

  // }


  public confirmUserOrder(obj):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}confirmUserOrder`,obj, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })
  }

  public registerUsers(obj){
    return this.http.post(`${this.baseUrl}confirmUserOrder`,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).subscribe(data=>{
        console.log("data found");
    },er=>{
        console.log("== error found "+er);
    })

    // return this.http.get

}

}
