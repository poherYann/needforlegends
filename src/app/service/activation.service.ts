import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})

export class ActivationService {

  url="http://localhost:8000/activation_token";

  httpOption={
    headers: new HttpHeaders()
  }
  constructor(private http: HttpClient,private router:Router,private toaster:ToastrService) { }


  getTokenActivation(token :string):void{

    this.http.post<any>(this.url,{ token : token }, this.httpOption).subscribe(value => {

      if(value === "Token valide"){

        this.toaster.success(value);
        this.router.navigate(['/login']);
      }
    }, err=>{

      this.toaster.error(err.error);
      this.router.navigate(['/login']);

    });

  }
}
