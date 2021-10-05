import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { register } from "../register";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url="https://127.0.0.1:8000/api/register";

  httpOption={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  addUser(r: register):void{
    this.http.post<register>(this.url, r, this.httpOption).subscribe();
  }
}
