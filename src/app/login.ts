export class Login {
  email:string;
  password:string;

  constructor(email?:string, password?:string) {
    this.email = email===undefined?"":email;
    this.password = password===undefined?"":password;
  }
}
