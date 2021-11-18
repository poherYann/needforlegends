import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Login } from "../login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email:["", [Validators.required, Validators.email]],
    password:["", []], // lertter num and car spécial
  });
  json={"username":"", "password":""};

  token :any;

  constructor(private fb:FormBuilder, private loginservice:LoginService,private route: ActivatedRoute
              ,private toaster:ToastrService,private activatedRoute: ActivatedRoute,private router:Router) {

  }

  ngOnInit(): void {

    this.token=localStorage.getItem("token") ;

    if(this.token!=null){
      this.router.navigate(["/search"]);
    }
    this.activatedRoute.queryParams.subscribe(params => {
      let str = params['register'];
      if(str != null){
        this.toaster.success("Sign up success you must activate your account ! (an email has been sended)");
      }
    });

  }

  onSubmit() {


    let result : Login=this.loginForm.value;

    this.json.username=result.email;
    this.json.password=result.password;

    this.loginservice.loginUser(this.json);

  }

}
