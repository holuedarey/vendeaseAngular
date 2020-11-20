import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-forget-password-confirm',
  templateUrl: './forget-password-confirm.component.html',
  styleUrls: ['./forget-password-confirm.component.css']
})
export class ForgetPasswordConfirmComponent implements OnInit {

  forgotPasswordConfirmForm: FormGroup;
  display: boolean;
  token:any;
  routeUrl:any;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService,) {
     this.routeUrl = this.router.url.split('/')[2] || null;
    console.log('url :', this.routeUrl);
    
    document.body.style.background = "#efefef";
    this.forgotPasswordConfirmForm = this.formBuilder.group({
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


  forgotPasswordConfirm() {

    const payload = {
      "action": "resetPwdLong",
      "value": {
        "password": this.forgotPasswordConfirmForm.value.password,
        "token": this.routeUrl
      }
    };
    
    this.display = true;
    this.authService.forgotPassword(payload).subscribe(message => {
      //hide loader and navigate to dash board Page
      this.display = false;
      this.toastr.success(message.message, 'Successful', {
        timeOut: 3000,
        closeButton:true
      });
      // this.router.navigate(['/forget-password-confirm']);
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
