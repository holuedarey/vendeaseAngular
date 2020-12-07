import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { OrdersService } from '../../_services/orders.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { AssignOrderComponent } from '../assign-order/assign-order.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  userData: any;
  orders: any[] = [];
  isLoadingOrder: boolean;
  // breadCrumb: string = 'Purchase Order List';
  breadCrumb: any = {
    firstLabel: 'Purchase Order',
    secondLabel: 'Purchase Order',
    url: 'order-list',
    secondLevel: false
  };

  searchPoForm: FormGroup;
  p: number = 1;
  limit:any = 50;
  skip:any = 0;
  totalItems:any;

  serial:any;

  constructor(public storageService: StorageService,
              private purchaseOrders: OrdersService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.searchPoForm = this.fb.group({
      search: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {

    this.orderLists();
  }


  async searchPo() {
    const payload = this.searchPoForm.value.search;
    if(payload == undefined) this.orderLists();
    this.purchaseOrders.searchPo(payload).subscribe(searchPo => {
      console.log('response :', searchPo);
      this.orders = searchPo.data.slice().reverse();
    }, error => {
      console.log('error : ', error);

    })
  }

  async orderLists() {
    this.isLoadingOrder = true;
    this.purchaseOrders.getOrders({skip : 0, limit:this.limit}).subscribe((order) => {
      console.log('order list data :', order.data)
      this.isLoadingOrder = false;
      this.orders = order.data;
      this.totalItems = order.total;
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      this.isLoadingOrder = false;
      console.log('Error :', error)
    })
  }



  pageChanged(event){
    this.skip = (event - 1) * this.limit;
    console.log('offset :', this.skip, event)
    this.p = event;
    this.purchaseOrders.getOrders({skip : this.skip, limit:this.limit}).subscribe((order) => {
      this.isLoadingOrder = false;
      this.totalItems = order.total;
      this.orders = order.data;
      this.serial = 1 + (this.p - 1) * this.limit;
      this.serial = this.serial;
    }, error => {
      this.isLoadingOrder = false;
      console.log('Error :', error)
    })
  }

  deleteOrder(order) {
    const r = confirm('are you Sure u want to delete');
    if (r == true) {
      this.isLoadingOrder = true;
      this.purchaseOrders.deleteOrder(order._id).subscribe((order) => {
        this.isLoadingOrder = false;
        this.toastr.success("Order Deleted Successfully", 'Successful', {
          timeOut: 3000,
          closeButton: true
        });
        this.orderLists();
      }, error => {
        this.isLoadingOrder = false;
        console.log('Error :', error)
      })
    } else {
      console.log('nothing')
    }

  }


  viewOrder(order) {
    console.log('data log : ', order);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        details: order._id
      }
    };
    this.router.navigate(['view/order'], navigationExtras)
  }

  assignOrder(order) {
    // console.log('user data : ', user)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    dialogConfig.position = {
      'top': '50px',

    };

    dialogConfig.data = {
      data: JSON.stringify(order)
    };

    const dialogRef = this.dialog.open(AssignOrderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        payloadData => {
          console.log('status : ', payloadData)
          if (payloadData) {
            this.purchaseOrders.viewOrder(payloadData).subscribe(users => {
              this.toastr.success("Order Updated Successfully", 'Successful', {
                timeOut: 3000,
                closeButton: true
              });
              this.orderLists();
            }, error => {
              console.log('Error :', error);
              this.isLoadingOrder = false;
              this.toastr.warning(error.error.message, 'Successful', {
                timeOut: 3000,
                closeButton: true
              });

            });
          }

        }
    );
  }


}
