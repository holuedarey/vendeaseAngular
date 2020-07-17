import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  isLoadingSupplierList: boolean;
  suppliers: any[] = [];
  constructor(private supplierService: SupplierService) { }

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

  }
}
