import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/User.service';
import { AllertifyserviceService } from '../../_service/allertifyservice.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private usersServic: UserService, private alertify: AllertifyserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
 this.route.data.subscribe(data => {
   this.users = data['users'];
 });
  }
  lodingUsers() {
    this.usersServic.getUsers().subscribe((users: User[]) => {
this.users = users;
console.log(this.users);
    }, error => {
      this.alertify.error('server Error');
    });
  }

}
