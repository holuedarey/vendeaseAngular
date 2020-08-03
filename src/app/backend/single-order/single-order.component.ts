import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../_services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { ProductService } from '../../_services/product.service';
import { FormGroup } from '@angular/forms';

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

  company_details_name:any;
  company_details_id:any;
  items:any[] = [];

  others:any[] = [];
  createdAt:any;
  sub_total;
  grand_total;

  userData:any;
  products:any[] = [];
  orderProducts:any[] = [];
  delivery_address:any;
  

  audit_trail:any[] = [];

  PurchaseOrderForm:FormGroup;
  
  constructor(
    private orderService: OrdersService, 
    private route:ActivatedRoute, 
    public storageService:StorageService,
    private productService:ProductService) {
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
    this.invoiceDetails();
  }

  async productListUser() {
    this.productService.produtList().subscribe((product) => {
      this.products = product.data
      console.log('product :', this.products)
    }, error => {
      console.log('Error :', error)
    })
  }

  async invoiceDetails() {
    this.isLoadingDetail = true;

    this.orderService.viewOrder(this.detail).subscribe(purchaseOrder => {
      this.isLoadingDetail = false;
      console.log('invoice single data :', purchaseOrder)
      
      // this.invoiceNumber = purchaseOrder.invoice_number;
      this.order_number = purchaseOrder.order_number;
      this.paid = purchaseOrder.paid;
      // this.payment_date = purchaseOrder.payment_date;
      // this.overDue = date_diff_indays(this.deafaultDate, this.payment_date);
      // this.company_details_name = purchaseOrder.company_details.name || null;
      this.company_details_id = purchaseOrder.company_details.id || null;
      this.orderProducts = purchaseOrder.items;
      this.delivery_address = purchaseOrder.delivery_address;
      // this.items = purchaseOrder.items || [];
      // this.others = purchaseOrder.other || [];
      // this.createdAt = purchaseOrder.createdAt;
      // this.sub_total = purchaseOrder.sub_total || 0;
      // this.grand_total = purchaseOrder.grand_total || 0;
      console.log('order Product :', this.orderProducts)
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }


  EditOrder(item){

  }
  getAuditTrail(PoId){
    this.orderService.viewOrder(PoId).subscribe(purchaseOrder => {
      console.log('details :', purchaseOrder)
    }, 
      error => {
      console.log('Error : ', error)
    });

  }

}


