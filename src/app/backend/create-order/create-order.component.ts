import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { ProductService } from '../../_services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from '../../_services/company.service';
import { OrdersService } from '../../_services/orders.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  cart: any;
  userData: any;
  products: any[] = [];
  companies: any[] = [];
  items = [];
  address = '';
  purchaseOrderForm: FormGroup;
  OrderAddressForm: FormGroup;
  searchProductForm: FormGroup;

  selected: any;
  @ViewChild('closebutton') closebutton;
  @ViewChild('keywordsInput') keywordsInput;

  selectedProduct:any;
  searchDone:boolean = false;
  formatedValue:any;
    _id :any;
    name :any;
    price: any;

  constructor(
    private storageService: StorageService,
    private orderService: OrdersService,
    private productService: ProductService,
    private fb: FormBuilder,
    private comanyServ: CompanyService,
    private router: Router,
    private toastr:ToastrService
  ) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.searchProductForm = this.fb.group({
      search: ['', Validators.compose([Validators.required])],
    });
    this.purchaseOrderForm = this.fb.group({
      product: ['', ""],
      quantity: ['', Validators.compose([Validators.required])],
      description: ['', ''],
    });

    this.OrderAddressForm = this.fb.group({
      address: ['', Validators.compose([Validators.required])],
      company: ['', ''],
    });
  }

  ngOnInit(): void {
    this.companyList();
    this.items = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.CART)) || [];
    this.productListUser();
    console.log('items :', this.selectedProduct);
  }

  searchProductByName(){
    const payload = this.searchProductForm.value.search;
    // if(payload == undefined) this.productListUser();
    this.productService.searchProduct(payload).subscribe(searchProduct => {
      if(searchProduct.data){
        this.searchDone = true;
      }
      console.log('response :', this.searchDone);
    
      return this.products = searchProduct.data.slice().reverse();
    }, error => {
      console.log('error : ', error);

    })
  }

  addAddress() {

    this.closebutton.nativeElement.click();

    let companyId;
    if (this.userData.type == 'system') {
      companyId = this.address = this.OrderAddressForm.value.company;
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
      this.toastr.warning("Error creating Invoice", 'Warning', {
        timeOut: 3000,
        closeButton: true
      });
      console.log('Error :', error)
    })

  }

  productListUser() {
    this.productService.produtList({ skip: 0, limit: Number.MAX_SAFE_INTEGER, }).subscribe((product) => {
      this.products = product.data.slice().reverse()
      console.log('product :', this.products)
    }, error => {
      console.log('Error :', error)
    })
  }
  companyList() {
    this.comanyServ.getCompanyList({ skip: 0, limit: Number.MAX_SAFE_INTEGER }).subscribe((company) => {
      this.companies = company.data;
      // console.log('companies ; ', this.companies);
    }, error => {
      console.log('Error :', error)
    })
  }
  
  selectedItem(product){
    this.searchDone = false;
    this.selectedProduct = product.name;
    this.formatedValue = `${product._id}#${product.name}#${product.vendease_price}`;
    //attach the product to the id
    this._id = product._id;
    this.name = product.name;
    this.price = product.vendease_price;
    console.log('selected Product : ', this.formatedValue );
    
  }
  
  addToCart() {
    // const product = this.purchaseOrderForm.value.product.split('#');
    // console.log('selected Product : ', product);
    if(this._id  == undefined || this.name  == undefined || this.price == undefined){
      this.toastr.warning("Select A Product", 'Warning', {
        timeOut: 3000,
        closeButton: true
      });
    }else{
      const _id = this._id;
      const name = this.name;
      const price = this.price;
      const item = {
        item: _id,
        name: name,
        price: price,
        quantity: this.purchaseOrderForm.value.quantity,
        description: this.purchaseOrderForm.value.description,
      }
  
      this.items = this.items.concat(item)
      this.storageService.set(Constants.STORAGE_VARIABLES.CART, JSON.stringify(this.items))
      this.cart = this.items.length;
      this._id = "";
      this.name= "";
      this.price = "";
      this.selectedProduct = "";
      this.purchaseOrderForm.reset();
    }
    
  }


  removeFromCart(product) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
      this.storageService.set(Constants.STORAGE_VARIABLES.CART, JSON.stringify(this.items))
      this.cart = this.items.length;
      // window.location.reload();
      console.log('item to display : ', this.items)
    }
  }

  subtractTwoArrays = (arr1, arr2) => arr1.filter(el => !arr2.includes(el))
}
