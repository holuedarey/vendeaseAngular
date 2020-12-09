import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  isLoadingSupplierList: boolean;
  suppliers: any[] = [];
  Message = "Parent to Child"

  skip:any;
  limit:number = 50 ;
  p: number = 1;
  totalItems:any;
  serial:any;


  breadCrumb: any = {
    firstLabel: 'Supplier List',
    secondLabel:'Supplier List',
    url: 'supplier-list',
    secondLevel:false
  };

  searchSupplierForm:FormGroup;
  userData:any;
  constructor(private fb: FormBuilder, private storageService : StorageService, private supplierService: SupplierService, public router:Router, private authService:AuthService) { 
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.searchSupplierForm = this.fb.group({
      search: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getSupplierLists();
  }

  getSupplierLists() {
    this.isLoadingSupplierList = true;
    this.supplierService.getSupplierList({skip:0, limit:this.limit}).subscribe(suppliers => {
      console.log('supplier data : ', suppliers)
      this.suppliers = suppliers.data;
      this.totalItems = suppliers.total;
      this.isLoadingSupplierList = false;
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      console.log('Error :', error);
      this.isLoadingSupplierList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    })
  }

  pageChanged(event){
    this.skip = (event - 1) * this.limit;
    console.log('offset :', this.skip)
    this.p = event;
    this.supplierService.getSupplierList({skip: this.skip, limit:this.limit}).subscribe(suppliers => {
      this.isLoadingSupplierList = false;
      this.suppliers = suppliers.data;
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      this.isLoadingSupplierList = false;
      console.log('Error :', error)
    })
  }

  viewSupplier(user){
    this.router.navigate(['view/supplier'], {state : user})
  }
  searchSupplier(){

    const payload = this.searchSupplierForm.value.search;
    console.log('payload : ', payload);
    
    if(payload == undefined) this.getSupplierLists();
    this.authService.searchUser(payload).subscribe(searchUsers => {
      console.log('response :', searchUsers);
      this.suppliers = searchUsers.data;
    }, error => {
      console.log('error : ', error);

    })
  }
}
