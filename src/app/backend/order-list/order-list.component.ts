import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { OrdersService } from '../../_services/orders.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { AssignOrderComponent } from '../assign-order/assign-order.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  userData: any;
  orders: any[] = [];
  isLoadingOrder: boolean;

  constructor(public storageService: StorageService,
    private purchaseOrders: OrdersService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
  }

  ngOnInit(): void {
    this.orderLists();
  }


  async orderLists() {
    this.isLoadingOrder = true;
    this.purchaseOrders.getOrders().subscribe((order) => {
      console.log('order list data :', order.data)
      this.isLoadingOrder = false;
      this.orders = order.data
    }, error => {
      this.isLoadingOrder = false;
      console.log('Error :', error)
    })
  }

  deleteOrder(order) {
    // this.isLoadingInvoice = true;
    // this.dashboard.deleteInvoice(invoice._id).subscribe((invoice) => {
    //   this.isLoadingInvoice = false;

    //   this.toastr.success("User Updated Successfully", 'Successful', {
    //     timeOut: 3000,
    //     closeButton: true
    //   });
    //   this.getInvoice();
    // }, error => {
    //   this.isLoadingInvoice = false;
    //   console.log('Error :', error)
    // })
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
    dialogConfig.height = '500px';
    dialogConfig.width = '600px';
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
