import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatchComponent } from './match/match.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from "primeng/accordion";

const ROUTES: Routes=[
  {path:'match/:summoner_name',component: MatchComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    AccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
