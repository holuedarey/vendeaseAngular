import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  submitAttempt: boolean;
  payload;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService, ) {

    document.body.style.background = "#efefef";
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      company: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      ConfrimPassword: ['']
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('ConfrimPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit() {
  }


  signUp() {
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
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

}
