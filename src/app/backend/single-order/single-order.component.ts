import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../_services/orders.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { ProductService } from '../../_services/product.service';
import { FormGroup } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../user-management/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { EditProductComponent } from '../product-list/edit-product/edit-product.component';
import { EditPoComponent } from './edit-po/edit-po.component';
import { RepurchaseComponent } from './repurchase/repurchase.component';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {

  isLoadingDetail: boolean;
  detail: any;
  invoiceNumber: any
  order_number;
  paid: any;
  payment_date: any;
  overDue: any;

  company_details_name: any;
  company_details_id: any;
  items: any[] = [];

  others: any[] = [];
  createdAt: any;
  sub_total;
  grand_total;

  userData: any;
  products: any[] = [];
  orderProducts: any[] = [];
  delivery_address: any;


  auditTrail: any[] = [];

  PurchaseOrderForm: FormGroup;
  isLoadingDelete: boolean;
  _id: any;

  breadCrumb: any = {
    firstLabel: 'Purchase Order',
    secondLabel: '',
    url: 'order-list',
    secondLevel: true
  };

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    public storageService: StorageService,
    private dialog: MatDialog,
    private router:Router,
    private toastr: ToastrService,
    private productService: ProductService) {
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];
      console.log('details : ', this.detail)
    });

    //get user data
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
  }
  ngOnInit(): void {
    this.breadCrumb.secondLabel = `Order #${this.detail}`;
    this.orderDetails();
  }

  productListUser() {
    this.productService.produtList().subscribe((product) => {
      this.products = product.data
      console.log('product :', this.products)
    }, error => {
      console.log('Error :', error)
    })
  }

  orderDetails() {
    this.isLoadingDetail = true;

    this.orderService.viewOrder(this.detail).subscribe(purchaseOrder => {
      this.isLoadingDetail = false;
      console.log('invoice single data :', purchaseOrder)
      this._id = purchaseOrder._id;
      this.order_number = purchaseOrder.order_number;
      this.paid = purchaseOrder.paid;
      this.company_details_id = purchaseOrder.company_details.id || null;
      this.orderProducts = purchaseOrder.items;
      this.delivery_address = purchaseOrder.delivery_address;
      console.log('order Product :', this.orderProducts)
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }


  EditOrder(orderData) {
    console.log('order ', orderData)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '500px';
    dialogConfig.position = {
      'top': '50px',
    };


    dialogConfig.data = {
      data: JSON.stringify(orderData)
    };
    const dialogRef = this.dialog.open(EditPoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(payload => {
      if (payload) {
        this.isLoadingDelete = true;
        console.log('payload po edit', payload);
        console.log('id :', orderData._id);

        this.orderService.editOrder(this._id, payload).subscribe(poEdit => {
          console.log('response :', poEdit);

          this.toastr.success("Purchase Order edited Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });
          this.isLoadingDelete = false;
          this.orderDetails();
        }, error => {
          console.log('Error :', error);
          this.isLoadingDelete = false;

        });
      }
    });
  }

  rePurchase() {
    const orderData = this.order_number;
    console.log('order ', orderData)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '320px';
    dialogConfig.width = '650px';
    dialogConfig.position = {
      'top': '50px',
    };


    dialogConfig.data = {
      data: JSON.stringify({orderProducts : this.orderProducts, order_number:this.order_number})
    };
    const dialogRef = this.dialog.open(RepurchaseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(items => {
      if (items) {
        this.isLoadingDelete = true;
        const payload = {
          items: items,
          company: this.company_details_id,
          delivery_address: this.delivery_address,
          delivery_deadline: "12/20/2019"
        }
        console.log('payload po repo', payload);
        this.orderService.createOrder(payload).subscribe(data => {
          this.storageService.clear(Constants.STORAGE_VARIABLES.CART)
          let navigationExtras: NavigationExtras = {
            queryParams: {
              details: data['long_invoice_number']
            }
          };
    
          this.router.navigate(['view/invoice'], navigationExtras)
        }, error => {
          console.log('Error :', error)
        })
      }
    });
  }

  
  addProduct() {
    const orderData = this.order_number;
    console.log('order ', orderData)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '900px';
    dialogConfig.position = {
      'top': '50px',
    };


    dialogConfig.data = {
      data: JSON.stringify(this._id)
    };
    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(payload => {
      if (payload) {
        this.isLoadingDelete = true;
        console.log('payload po repo', payload);
        this.orderService.repurchaseOrder(payload).subscribe(repurchase => {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              details: repurchase['long_invoice_number']
            }
          };
        
          this.toastr.success("Purchase order was successful, Please make payment for invoice below", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });
          this.isLoadingDelete = false;
        }, error => {
          console.log('Error :', error);
          this.isLoadingDelete = false;

        });
      }
    });
  }

  getAuditTrail(PoId) {
    this.orderService.viewOrder(PoId).subscribe(audit_trail => {
      this.auditTrail = audit_trail;
      console.log('details :', audit_trail)
    },
      error => {
        console.log('Error : ', error)
      });
  }

  deletePo(PoId) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '130px';
    dialogConfig.width = '250px';
    dialogConfig.position = {
      'top': '50px',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.isLoadingDelete = true;
        this.orderService.deleteOrder(PoId).subscribe(users => {
          this.toastr.success("Purchase Order Deleted Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });
          this.isLoadingDelete = false;
          this.orderDetails();
        }, error => {
          console.log('Error :', error);
          this.isLoadingDelete = false;

        });
      }
    });
  }
}

