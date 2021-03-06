import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule} from "primeng/menu";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ActivationComponent } from "./activation/activation.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import {MatchComponent} from "./match/match.component";
import {AccordionModule} from "primeng/accordion";
import {SearchComponent} from "./search/search.component";
import {LogoutComponent} from "./logout/logout.component";
import {AlgorithmeComponent} from "./algorithme/algorithme.component";
import {
  GetChampionResolver,
  GetItemResolver,
  GetMatchResolver,
  GetMatchStatResolver,
  GetSummonerResolver
} from "./Service/resolver.service";
import {timestampDifferenceComponent} from "./Pipe/timestampDifferenceComponent";
import {timestampComponent} from "./Pipe/timestampComponent";
import {
  AuthGuardService as AuthGuard
} from './Service/auth-guard.service';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";
import {InputNumberModule} from "primeng/inputnumber";

const appRoutes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: '', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activation/:token', component: ActivationComponent },
  { path:'match/:summoner_name',component: MatchComponent,resolve:{
      data: GetMatchResolver,GetChampionResolver,GetItemResolver,GetSummonerResolver,
    },
  },
  { path:'search',component: SearchComponent },
  { path:'algo',component: AlgorithmeComponent, canActivate: [AuthGuard],
    resolve:{
    data: GetMatchStatResolver,
    } },
  { path:'logout',component: LogoutComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    timestampDifferenceComponent,
    timestampComponent,
    HeaderComponent,
    FooterComponent,
    ActivationComponent,
    RegisterComponent,
    LoginComponent,
    MatchComponent,
    SearchComponent,
    AlgorithmeComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    HttpClientModule,
    TabMenuModule,
    MenuModule,
    ToastrModule.forRoot(),
    NgbModule,
    AccordionModule,
    MatProgressBarModule,
    TriStateCheckboxModule,
    InputNumberModule,

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
