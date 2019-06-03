import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// First Step To call Service
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_service/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AllertifyserviceService } from './_service/allertifyservice.service';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot()
   ],
   providers: [
      AuthService,
      AllertifyserviceService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
