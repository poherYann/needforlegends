import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../login";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="https://127.0.0.1:8000/api/login_check";

  httpOption={
    headers: new HttpHeaders()
  }

  constructor(private http: HttpClient) { }

  loginUser(json: any):void{
    this.http.post<any>(this.url, json, this.httpOption).subscribe(value => {console.log(value.token)});
  }
}
