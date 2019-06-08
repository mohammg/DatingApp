import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
model: any = {};
registerForm: FormGroup;
  constructor(private authservice: AuthService, private alertify: AllertifyserviceService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      confirmpassword: new FormControl('', Validators.required)
    }, [this.passwordMatchValidator]);
  }
  passwordMatchValidator(g: FormGroup)  {
    return g.get('password').value === g.get('confirmpassword').value ? null : {'mismatch': true};
  }

  register() {
 //   console.log(this.model);
 // this.authservice.register(this.model).subscribe(a => {
  // this.alertify.success('registeration succeseful');
  // this.cancel();
// }, error => { this.alertify.error(error); });
}
cancel() {
this.cancelRegister.emit(false);
}
}
