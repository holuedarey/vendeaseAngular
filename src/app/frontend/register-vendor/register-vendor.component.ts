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
  signUpForm1: FormGroup;
  signUpForm2: FormGroup;
  signUpForm3: FormGroup;
  signUpForm4: FormGroup;
  submitAttempt: boolean;
  payload;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,) {
    document.body.style.background = "#efefef";

    this.signUpForm1 = this.formBuilder.group({
      business_name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      reg_number: ['', Validators.compose([Validators.required])],
      tin: ['', Validators.compose([Validators.required])], 
    });

    this.signUpForm2 = this.formBuilder.group({
      contact_p_phone:['', Validators.compose([Validators.required])],
      contact_p_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

    this.signUpForm3 = this.formBuilder.group({
      vendor_category: ['', Validators.compose([Validators.required])],
      notice_period: ['', Validators.compose([Validators.required])],
      can_deliver: ['', Validators.compose([Validators.required])],
      warrant_period: ['', Validators.compose([Validators.required])],
    });

    this.signUpForm4 = this.formBuilder.group({
      bank_name: ['', Validators.compose([Validators.required])],
      acc_name: ['', Validators.compose([Validators.required])],
      acc_number: ['', Validators.compose([Validators.required])],
      bvn: ['', Validators.compose([Validators.required])],
      terms: ['', Validators.compose([Validators.required])],
    });
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
    this.payload = {
      business_name: this.signUpForm1.value.business_name,
      address:  this.signUpForm1.value.address,
      tin: this.signUpForm1.value.tin,
      reg_number:this.signUpForm1.value.reg_number,
    }
  }

  onStep2Next(ev) {
    this.payload.contact_p_phone = this.signUpForm2.value.contact_p_phone;
    this.payload.contact_p_name =  this.signUpForm2.value.contact_p_name;
    this.payload.email =  this.signUpForm2.value.email;
    this.payload.password =  this.signUpForm2.value.password;
  }

  onStep3Next(ev) {
    this.payload.vendor_category = this.signUpForm3.value.vendor_category;
    this.payload.notice_period =  this.signUpForm3.value.notice_period;
    this.payload.can_deliver =  this.signUpForm3.value.can_deliver;
    this.payload.warrant_period =  this.signUpForm3.value.warrant_period;
  }

  onComplete(ev) {
     this.payload.bank_name= this.signUpForm4.value.bank_name;
     this.payload.acc_name= this.signUpForm4.value.acc_name;
     this.payload.acc_number= this.signUpForm4.value.acc_number;
     this.payload.bvn= this.signUpForm4.value.bvn;

     console.log('payload data : ', this.payload)
    this.submitAttempt = true;
    // this.loader.showLoader();
    // this.payload = {    
    //   password: this.signUpForm1.value.password,
    //   name:  `${this.signUpForm.value.firstName} ${this.signUpForm.value.lastName}`,
    //   email: this.signUpForm.value.email,
    //   phone:this.signUpForm.value.phone,
    //   type: 'company',
    //   company: {
    //       name:this.signUpForm.value.company,
    //       address: this.signUpForm.value.address
    //   }
    // }
    // // console.log('data: ', JSON.stringify(this.payload))
    
    // this.authService.signUpBusiness(this.payload).subscribe(user => {
    //   //hide loader and navigate to dash board Page
    //   console.log('returnd data : ', user)
    //   this.router.navigate(['/login'])
    //   // this.loader.hideLoader();
    // }, error => {
    //   console.log('Error :', error)
    // });
  }
}

