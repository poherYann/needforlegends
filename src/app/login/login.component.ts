import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Login } from "../login";
import { LoginService } from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email:["", [Validators.required, Validators.email]],
    password:["", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'), Validators.minLength(5), Validators.maxLength(50)]], // lertter num and car spécial
  });
  json={"email":"", "password":""};

  constructor(private fb:FormBuilder, private loginservice:LoginService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {

    let result : Login=this.loginForm.value;

    this.json.email=result.email;
    this.json.password=result.password;

    console.log(this.json);
    this.loginservice.loginUser(this.json);
  }

}
