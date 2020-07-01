import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  submitAttempt: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    public storage: StorageService,
  ) {
    if (this.authService.isAuthenticated()) {
      router.navigate(['/dashboard'])
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      // strategy: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  };

  signIn() {
    this.submitAttempt = true;
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }

    this.authService.signIn(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        strategy: 'local'
      }).subscribe(user => {
        //hide loader and navigate to dash board Page
        // this.loader.hideLoader();
        this.router.navigate(['/dashboard']);


      }, error => {
        // this.loader.hideLoader();  
        console.log('Error : ', error.error)
        // this.loader.presentToast(error.error.error);
        // this.loader.presentToast(error.error.message);
      });
  }

}
