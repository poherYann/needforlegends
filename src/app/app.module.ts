import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';



const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'games', component: GamesComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
