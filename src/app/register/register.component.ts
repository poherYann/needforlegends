import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { RegisterService } from "../service/register.service";
import { ToastrService } from "ngx-toastr";
import { Register } from "../register";


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
    name:["", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*\\S+(\\s\\S+)*')]],
    surname:["", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*\\S+(\\s\\S+)*')]],
    summoner_name:["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    email:["", [Validators.required, Validators.email]],
    password1:["", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'), Validators.minLength(5), Validators.maxLength(50)]], // letter num et car spécial
    password2:["", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'), Validators.minLength(5), Validators.maxLength(50)]], // letter num et car spécial],
    platform:["", [Validators.required, ]]
  });

  platforms: Platform[];
  json={"email":"","password":"","name":"","surname":"","platform":"","summoner_name":""};

  constructor(private fb:FormBuilder, private registerservice:RegisterService,private toaster:ToastrService) {
    this.platforms = [
      {name: 'EUW', code: 'EUW'},
      {name: 'NA', code: 'NA'},
      {name: 'CBLOL', code: 'CBLOL'},
    ];
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let result : Register=this.registerForm.value;

    if(result.password1 === result.password2) {

      this.json.email = result.email;
      this.json.password = result.password1;
      this.json.name = result.name;
      this.json.surname = result.surname;
      // @ts-ignore
      this.json.platform = Object.values(result.platform)[0];
      this.json.summoner_name = result.summoner_name;
      this.registerservice.addUser(this.json);

    }else{
      this.toaster.error("Passwords must be the same ");
    }

  }
}
