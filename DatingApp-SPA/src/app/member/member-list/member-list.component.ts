import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/User.service';
import { AllertifyserviceService } from '../../_service/allertifyservice.service';
import { User } from '../../_models/User';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private usersServic: UserService, private alertify: AllertifyserviceService) { }

  ngOnInit() {
    this.lodingUsers();
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
