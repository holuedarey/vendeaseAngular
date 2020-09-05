import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { DeliveryService } from '../../_services/delivery.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-delivery',
  templateUrl: './single-delivery.component.html',
  styleUrls: ['./single-delivery.component.css']
})
export class SingleDeliveryComponent implements OnInit {

  detail: any;
  deliveryId: any;
  userData: any;
  deliveries: any;
  current_status: any[] = []

  delivered: any;
  confirm: any;
  company_details: any;
  company_confirm: any;
  order_no: any;
  status: any;

  breadCrumb: any = {
    firstLabel: 'Delivery List',
    secondLabel: '',
    url: '/delivery-list',
    secondLevel: true
  };

  updateLocationForm: FormGroup;
  statusUpdateForm: FormGroup;

  @ViewChild('closebutton') closebutton;
  constructor(private route: ActivatedRoute,
    private storageService: StorageService,
    private toastr:ToastrService,
    private fb: FormBuilder,
    private delivery: DeliveryService) {
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];
      this.deliveryId = this.detail;
      const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
      this.userData = theData;
      // console.log('details : ', this.userData);

    });

    this.updateLocationForm = this.fb.group({
      location: ['', Validators.compose([Validators.required])],
    });

    
    this.statusUpdateForm = this.fb.group({
      status: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getDelievery();
    this.breadCrumb.secondLabel = `Delivery #${this.detail}`;
  }

  getDelievery() {
    this.delivery.getDelivery(this.deliveryId).subscribe(delivery => {
      this.deliveries = delivery.data;
      this.delivered = delivery.delivered;
      this.confirm = delivery.confirm;
      this.current_status = delivery.current_status;
      this.company_details = delivery.company_details.name;
      this.company_confirm = delivery.company_confirm;
      this.order_no = delivery.order_no;
      this.status = delivery.status;

      console.log('log data : ', this.current_status)
    }, error => {
      console.log('Error :', error)
    })
  }

  updateDeleivery() {
    const payload = {
      'current_status': {
        'date': new Date().toDateString(),
        'description': this.updateLocationForm.value.location
      }
    }
    console.log('payload ', payload);
    this.delivery.updateDelivery(this.deliveryId, payload).subscribe(delivery => {
      this.closebutton.nativeElement.click();
      this.toastr.success(`Status Updated Successfully`, 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.getDelievery();
      console.log('log data : ', delivery)
    }, error => {
      console.log('Error :', error)
    })
  }

  updateDeleiveryStatus() {
    const payload = {
     status: this.statusUpdateForm.value.location
    }
    console.log('payload ', payload);
    this.delivery.updateDelivery(this.deliveryId, payload).subscribe(delivery => {
      this.closebutton.nativeElement.click();
      this.toastr.success(`Status Updated Successfully`, 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.getDelievery();
      console.log('log data : ', delivery)
    }, error => {
      console.log('Error :', error)
    })
  }

  markDeliverd() {
    const payload = {
      'delivered': true,
      'status': 'delivered'
    }
    console.log('payload ', payload);
    this.delivery.updateDelivery(this.deliveryId, payload).subscribe(delivery => {
      this.closebutton.nativeElement.click();
      this.toastr.success("You successfully marked a PO as delivered", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.getDelievery();
      console.log('log data : ', delivery)
    }, error => {
      console.log('Error :', error)
    })
  }
}
