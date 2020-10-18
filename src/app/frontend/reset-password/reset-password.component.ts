import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  display: boolean;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService,) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
  }

  resetPassword() {
    const payload = {
      action: "passwordChange",
      value: {
        user: {
          email: this.resetPasswordForm.value.email
        },
        oldPassword: this.resetPasswordForm.value.password,
        password: this.resetPasswordForm.value.confirmPassword
      }
    }
    this.display = true;
    this.authService.forgotPassword(payload).subscribe(message => {
      //hide loader and navigate to dash board Page
      console.log(' got here')
      this.display = false;
      this.toastr.success(message.message, 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log('Error : ', error.error)
      this.display = false;
      // console.log('error : ', error.error.data.message);
      this.toastr.error(error.error.data.message || 'error', 'Error', {
        timeOut: 3000,
        closeButton: true
      });
    });
  }

}
