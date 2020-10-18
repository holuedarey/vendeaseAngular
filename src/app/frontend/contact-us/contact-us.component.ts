import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContctUsService } from '../../_services/contct-us.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  ContactUsForm: FormGroup;
  submitAttempt: boolean;
  display: boolean;

  constructor(private toastr: ToastrService, private contactUsService: ContctUsService, private formBuilder:FormBuilder, private router:Router) {
    this.ContactUsForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      organization: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
  }

  contactUs() {
    const payload = {
      name: this.ContactUsForm.value.name,
      phone:  this.ContactUsForm.value.phone,
      address:  this.ContactUsForm.value.address,
      organization:  this.ContactUsForm.value.organization,
      email:  this.ContactUsForm.value.email,
      message:  this.ContactUsForm.value.message,
    }
    this.submitAttempt = true;

    this.display = true;
    this.contactUsService.contactUs(payload).subscribe(message => {
      //hide loader and navigate to dash board Page
      console.log(' got here')
      this.display = false;
      this.router.navigate(['/contact']);
      this.ContactUsForm.reset();
      this.toastr.success(message.message, 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
    }, error => {
      // this.loader.hideLoader();  
      console.log('Error : ', error.error)
      this.display = false;
      this.toastr.error(error.error.data.message || 'error', 'Error', {
        timeOut: 3000,
        closeButton: true
      });

    });

  }
}
