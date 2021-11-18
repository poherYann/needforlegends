import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GetuserService {

  url="http://127.0.0.1:8000/get_user";


  constructor(private http: HttpClient,private router:Router,private toaster:ToastrService) { }

  getUser(email: string): any{

    localStorage.setItem("email",email);

   let httpOption={
      headers: new HttpHeaders({
      })
    };

   return this.http.post<any>(this.url,{email:email}, httpOption);
  }
}
