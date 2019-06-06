import { Component, OnInit,  ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AllertifyserviceService } from 'src/app/_service/allertifyservice.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_service/User.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-member-edite',
  templateUrl: './member-edite.component.html',
  styleUrls: ['./member-edite.component.css']
})
export class MemberEditeComponent implements OnInit {
user: User;
photoUrl: string;
@ViewChild('editeForm') editeForm: NgForm;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editeForm.dirty) {
    $event.returnValue = true;
  }
}
constructor( private route: ActivatedRoute
  , private userservice: UserService
  , private auth: AuthService
  , private alertify: AllertifyserviceService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.auth.CurrentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }
  changMainPhoto(url: string) {
    this.user.photoUrl = url;
    // this.auth.ChangPhoto(url);
  }
  updateUser() {
   this.userservice.updateUser(this.auth.decodeToken.nameid, this.user).subscribe(() => {
    this.alertify.success('success');
    this.editeForm.reset(this.user);
   } , error => {
    this.alertify.error('Failed Save Changes');
   });

  }

}
