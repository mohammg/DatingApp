import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
model: any = {};
  constructor(private authservice: AuthService, private alertify: AllertifyserviceService) { }

  ngOnInit() {
  }
  register() {
    console.log(this.model);
 this.authservice.register(this.model).subscribe(a => {
  this.alertify.success('registeration succeseful');
  this.cancel();
}, error => { this.alertify.error(error); });
}
cancel() {
this.cancelRegister.emit(false);
}
}
