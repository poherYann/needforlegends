import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { register } from "../register";
import { RegisterService } from "../service/register.service";


interface Platform {
  name:string,
  code:string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    name:["", Validators.required],
    surname:["", Validators.required],
    summoner_name:["", Validators.required],
    email:["", Validators.required],
    password1:["", Validators.required],
    password2:["", Validators.required],
    platform:["", Validators.required],
  });
  platforms: Platform[];
  json={"email":"","password":"","name":"","surname":"","platform":"","summoner_name":""};

  constructor(private fb:FormBuilder, private registerservice:RegisterService ) {
    this.platforms = [
      {name: 'EUW', code: 'EUW'},
      {name: 'NA', code: 'NA'},
      {name: 'CBLOL', code: 'CBLOL'},
    ];
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let result : register=this.registerForm.value;

    this.json.email=result.email;
    this.json.password=result.password1;
    this.json.name=result.name;
    this.json.surname=result.surname;
    this.json.platform="EUW";
    this.json.summoner_name=result.summoner_name;

    this.registerservice.addUser(this.json);
  }
}
