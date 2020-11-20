import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  display: boolean;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService,) {

    document.body.style.background = "#efefef";
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }


  forgotPassword() {

    const payload = {
      action: "sendResetPwd",
      value: {
        email: this.forgotPasswordForm.value.email,
      }
    }
    this.display = true;
    this.authService.forgotPassword(payload).subscribe(message => {
      //hide loader and navigate to dash board Page
      this.display = false;
      this.toastr.success(message.message, 'Successful', {
        timeOut: 3000,
        closeButton:true
      });
      this.router.navigate(['/reset/5f8f552480218c6fcaee6e35___5370056afb77836198534fda555714']);
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
