import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Register } from "../register";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url="http://127.0.0.1:8000/register";

  httpOption={
    headers: new HttpHeaders()
  }

  constructor(private http: HttpClient,private router:Router,private toaster:ToastrService) { }

   addUser(json: any){
   this.http.post<any>(this.url, json, this.httpOption).subscribe((data)=>{
     this.router.navigate(['/login'], { queryParams: {register:"success"}});

   }, (error) => {
     this.toaster.error(error.error.message)
     });
  }
}
