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
  constructor(private supplierService: SupplierService, public router:Router) { }

  ngOnInit(): void {
    this.getSupplierLists();
  }

  getSupplierLists() {
    this.isLoadingSupplierList = true;
    this.supplierService.getSupplierList().subscribe(suppliers => {
      console.log('supplier data : ', suppliers)
      this.suppliers = suppliers.data;

      this.isLoadingSupplierList = false;
    }, error => {
      console.log('Error :', error);
      this.isLoadingSupplierList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    })
  }

  viewSupplier(user){

    // console.log('user deatils : ', user._id)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user)
      }
    };
    this.router.navigate(['view/supplier'], {state : user})
    
  }
}
