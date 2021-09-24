import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

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
    password:["", Validators.required],
    platform:["", Validators.required],
  })

  constructor(private fb:FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
