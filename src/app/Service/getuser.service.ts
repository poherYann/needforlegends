import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GetuserService {

  url="http://127.0.0.1:8000/api/get_user";


  constructor(private http: HttpClient,private router:Router,private toaster:ToastrService) { }

  getUser(email: string,token: string | null):void{

   let httpOption={
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      })
    };

    this.http.post<any>(this.url,{email:email}, httpOption).subscribe(value => {

      if(value.request.code === 200){

        if(value.detail!=null) {
          this.toaster.success(value.detail);
        }else {
          localStorage.setItem("user",value.user);
        }
      }
      }, err=>{

      this.toaster.error(err.error.detail);

    });
  }
}
