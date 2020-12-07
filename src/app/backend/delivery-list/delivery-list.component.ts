import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { DeliveryService } from '../../_services/delivery.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../user-management/confirm-dialog/confirm-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  deliveries: any[] = [];

  userData: any;
  isLoadingDelievery: boolean;

  breadCrumb: any = {
    firstLabel: 'Delivery List',
    secondLabel: 'Delivery List',
    url: 'delivery-list',
    secondLevel: false
  };
  searchDeliveryForm: FormGroup;
  p: number = 1;
  limit:any = 50;
  skip:any;
  totalItems:any;
  serial:any;

  constructor(
      private storageService: StorageService,
      private dleivery: DeliveryService,
      private dialog: MatDialog,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private router: Router) {
    this.searchDeliveryForm = this.fb.group({
      search: ['', Validators.compose([Validators.required])],
    });
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

  }

  ngOnInit(): void {
    this.getDeliveries();
  }

  getDeliveries() {
    this.isLoadingDelievery = true;
    this.dleivery.getAllDeliveries({skip: 0, limit: this.limit}).subscribe(delivery => {
      console.log('delievry data :', delivery)
      this.isLoadingDelievery = false;
      this.totalItems = delivery.total;
      this.deliveries = delivery.data.slice().reverse();
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      this.isLoadingDelievery = false;
      console.log('Error :', error)
    })
  }

  pageChanged(event){
    this.skip = (event - 1) * this.limit;
    this.p = event;
    this.dleivery.getAllDeliveries({skip: this.skip, limit: this.limit}).subscribe(delivery => {
      console.log('invoice data :', delivery.data)
      this.isLoadingDelievery = false;
      this.deliveries = delivery.data.slice().reverse();
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      this.isLoadingDelievery = false;
      console.log('Error :', error)
    })
  }

  confirmDelivery(delivery) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '150px';
    dialogConfig.width = '350px';
    dialogConfig.position = {
      'top': '50px',
    };

    dialogConfig.data = {
      data: JSON.stringify(delivery)
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close();
        console.log('Yes clicked');
        const payload = {
          company_confirm: true,
        };
        this.dleivery.confirmDelivery(delivery._id, payload).subscribe(confirmDelivery => {
          console.log('response :', confirmDelivery);

          this.toastr.success("Delivery Confirm Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });
          this.getDeliveries();
        }, error => {
          console.log('error : ', error);

        })
      }
    });

  }

  viewDelivery(delivery) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        details: delivery._id
      }
    };
    this.router.navigate(['view/delivery'], navigationExtras)
  }


  searchDeleivery() {
    const payload = this.searchDeliveryForm.value.search;
    if(payload == undefined) this.getDeliveries();
    this.dleivery.searchDelivery(payload).subscribe(searchDelivery => {
      this.deliveries = searchDelivery.data.slice().reverse();
      console.log('delivert ; ', this.deliveries);
      
    }, error => {
      console.log('error : ', error);

    })
  }

}
