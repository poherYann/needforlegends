export class Register {
  name:string;
  surname:string;
  summoner_name:string;
  email:string;
  password1:string;
  password2:string;
  platform:string;

  constructor(name?:string, surname?:string, summoner_name?:string, email?:string, password1?:string, password2?:string, platform?:string) {
    this.name = name===undefined?"":name;
    this.surname = surname===undefined?"":surname;
    this.summoner_name = summoner_name===undefined?"":summoner_name;
    this.email = email===undefined?"":email;
    this.password1 = password1===undefined?"":password1;
    this.password2 = password2===undefined?"":password2;
    this.platform = platform===undefined?"":platform;
  }
}
