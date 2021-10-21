import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';

import { TabMenuModule } from 'primeng/tabmenu';

import { MenuModule} from "primeng/menu";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {HomeComponent} from "./home/home.component";


const appRoutes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'games', component: GamesComponent },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    HomeComponent
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
    TabMenuModule,
    MenuModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
