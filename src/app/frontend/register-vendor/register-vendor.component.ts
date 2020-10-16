import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.css']
})
export class RegisterVendorComponent implements OnInit {
  signUpForm: FormGroup;
  submitAttempt: boolean;
  payload;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,) {
    document.body.style.background = "#efefef";

    this.signUpForm = this.formBuilder.group({
      business_name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      reg_number: ['', Validators.compose([Validators.required])],
      tin: ['', Validators.compose([Validators.required])],
      contact_p_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      vendor_category: ['', Validators.compose([Validators.required])],
      notice_period: ['', Validators.compose([Validators.required])],
      can_deliver: ['', Validators.compose([Validators.required])],
      warrant_period: ['', Validators.compose([Validators.required])],
      bank_name: ['', Validators.compose([Validators.required])],
      acc_name: ['', Validators.compose([Validators.required])],
      acc_number: ['', Validators.compose([Validators.required])],
      bvn: ['', Validators.compose([Validators.required])],
      terms: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit() {

  }

  onStep1Next(ev) {
    console.log('event data : ', ev)
  }

  onStep2Next(ev) {

  }

  onStep3Next(ev) {

  }

  onComplete(ev) {

    this.submitAttempt = true;
    // this.loader.showLoader();
    this.payload = {    
      password: this.signUpForm.value.password,
      name:  `${this.signUpForm.value.firstName} ${this.signUpForm.value.lastName}`,
      email: this.signUpForm.value.email,
      phone:this.signUpForm.value.phone,
      type: 'company',
      company: {
          name:this.signUpForm.value.company,
          address: this.signUpForm.value.address
      }
    }
    // console.log('data: ', JSON.stringify(this.payload))
    
    this.authService.signUpBusiness(this.payload).subscribe(user => {
      //hide loader and navigate to dash board Page
      console.log('returnd data : ', user)
      this.router.navigate(['/login'])
      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error)
     

    });
  }
}

