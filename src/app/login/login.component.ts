import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../service/login.service";
import { ActivatedRoute } from "@angular/router";
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

  token :string |null;

  constructor(private fb:FormBuilder, private loginservice:LoginService,private route: ActivatedRoute
              ,private toaster:ToastrService,private activatedRoute: ActivatedRoute) {
    this.token=localStorage.getItem("item") ;
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      let str = params['register'];
      if(str != null){
        this.toaster.success("Inscription réussis vous devez activer votre compte pour vous connecter !");
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
