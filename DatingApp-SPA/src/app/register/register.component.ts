import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
model: any = {};
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }
  register() {
    console.log(this.model);
 this.authservice.register(this.model).subscribe(a => {
  console.log('registeration succeseful');
  this.cancel();
}, error => { console.log(error); });
}
cancel() {
this.cancelRegister.emit(false);
}
}
