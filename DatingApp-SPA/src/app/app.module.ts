import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// First Step To call Service
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';



import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_service/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AllertifyserviceService } from './_service/allertifyservice.service';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { UserService } from './_service/User.service';
import { MemberCardComponent } from './member/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-details.resolver';
import { MemberEditeComponent } from './member/member-edite/member-edite.component';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditeResolver } from './_resolver/member-edite.resolver';
import { PereventUnsaveChanges } from './_gurdes/prevent-unsave-changes.guard';
import { PhotoEditeComponent } from './member/photo-edite/photo-edite.component';
export function tokenGetter() {
   return localStorage.getItem('token');
 }
@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MemberListComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditeComponent,
      PhotoEditeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
           tokenGetter: tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
       })
   ],
   providers: [
      AuthService,
      AllertifyserviceService,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditeResolver,
      PereventUnsaveChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
