import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";


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
      {name: 'Europe de l\'Ouest', code: 'EUW'},
      {name: 'Amerique du Nord', code: 'NA'},
      {name: 'Brésil', code: 'CBLOL'},
    ];
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
