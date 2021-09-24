import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import {register} from "../register";


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

  constructor(private fb:FormBuilder) {
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
    console.log(result);
  }
}
