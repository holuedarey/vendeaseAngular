import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';
import { Router, NavigationExtras } from '@angular/router';

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

  constructor(private supplierService: SupplierService, public router:Router) { }

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

}
