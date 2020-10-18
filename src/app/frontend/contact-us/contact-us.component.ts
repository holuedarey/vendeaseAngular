import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContctUsService } from '../../_services/contct-us.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  ContactUsForm: FormGroup;
  submitAttempt: boolean;
  display: boolean;

  constructor(private toastr: ToastrService, private contactUsService: ContctUsService) { }

  ngOnInit() {
  }

  contactUs() {
    const payload = {
      name: "Ernest Offiong",
      phone: "+2347030622206",
      address: "oderinde street Ibadan",
      organization: "Freelance Org",
      email: "ernest.offiong@gmail.com",
      message: "Helo, I would like to make sure this error noticed in the first execution has been rectified"
    }
    this.submitAttempt = true;

    this.display = true;
    this.contactUsService.contactUs(payload).subscribe(message => {
      //hide loader and navigate to dash board Page
      console.log(' got here')
      this.display = false;
      this.toastr.success(message.message, 'Error', {
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
