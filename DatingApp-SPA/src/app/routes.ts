import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_gurdes/auth.guard';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-details.resolver';
import { MemberEditeComponent } from './member/member-edite/member-edite.component';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditeResolver } from './_resolver/member-edite.resolver';
import { PereventUnsaveChanges } from './_gurdes/prevent-unsave-changes.guard';
export const appRoutes: Routes = [
{path: '' , component: HomeComponent},
{path: '',
 runGuardsAndResolvers: 'always',
 canActivate: [AuthGuard],
 children: [
    {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
    {path: 'members/:id', component: MemberDetailComponent,
     resolve: {user: MemberDetailResolver}},
     {path: 'member/edite', component: MemberEditeComponent, resolve: {user: MemberEditeResolver}, canDeactivate: [PereventUnsaveChanges] },
    {path: 'messages', component: MessagesComponent},
    {path: 'lists', component: ListsComponent},
 ]

}
, {path: '**', redirectTo: '', pathMatch: 'full'}

];
