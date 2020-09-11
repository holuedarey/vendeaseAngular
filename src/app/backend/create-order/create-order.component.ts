import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { ProductService } from '../../_services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from '../../_services/company.service';
import { OrdersService } from '../../_services/orders.service';
import { error } from 'protractor';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  breadCrumb: any = {
    firstLabel: 'Purchase Order',
    secondLabel: 'Raise Purchase Order',
    url: 'order-list',
    secondLevel: true
  };

  userData: any;
  products: any[] = [];
  companies: any[] = [];
  items = [];
  address = '';
  purchaseOrderForm: FormGroup;
  OrderAddressForm: FormGroup;
  @ViewChild('closebutton') closebutton;
  constructor(
    private storageService: StorageService,
    private orderService: OrdersService,
    private productService: ProductService,
    private fb: FormBuilder,
    private comanyServ: CompanyService,
    private router: Router
  ) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.purchaseOrderForm = this.fb.group({
      product: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });

    this.OrderAddressForm = this.fb.group({
      address: ['', Validators.compose([Validators.required])],
      company: ['',''],
    });
  }

  ngOnInit(): void {
    this.companyList();
    this.items = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.CART)) || [];
    this.productListUser();
    // console.log('items :', this.items)
  }

  addAddress() {
    
    this.closebutton.nativeElement.click();

    let companyId;
    if (this.userData.type == 'system') {
      companyId =  this.address = this.OrderAddressForm.value.company;
    } else {
      companyId = this.userData.company.id;
    }
    const payload = {
      items: this.items,
      company: companyId,
      delivery_address: this.address = this.OrderAddressForm.value.address,
      delivery_deadline: "12/20/2019"
    }
    console.log('payload data ', payload);
    //save the purchase order
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

  productListUser() {
    this.productService.produtList().subscribe((product) => {
      this.products = product.data.slice().reverse()
      // console.log('product :', this.products)
    }, error => {
      console.log('Error :', error)
    })
  }


  companyList() {
    this.comanyServ.getCompanyList().subscribe((company) => {
      this.companies = company.data;
      // console.log('companies ; ', this.companies);
    }, error => {
      console.log('Error :', error)
    })
  }

  addToCart() {
    const product = this.purchaseOrderForm.value.product.split('#');
    const _id = product[0];
    const name = product[1];

    const item = {
      item: _id,
      name: name,
      quantity: this.purchaseOrderForm.value.quantity,
      description: this.purchaseOrderForm.value.description,
    }

    this.items = this.items.concat(item)
    this.storageService.set(Constants.STORAGE_VARIABLES.CART, JSON.stringify(this.items))
    this.purchaseOrderForm.reset();
  }

  removeFromCart(product) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

}
