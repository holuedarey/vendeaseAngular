import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from '../../../_services/supplier.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  description: any;
  vendor: any;
  phone: any;
  suppliers: any;
  AssignProductForm: FormGroup;
  constructor(
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShowProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = JSON.parse(data.data);
    this.vendor = this.description.vendor;
  
  }

  ngOnInit(): void {
    console.log('data comp:', this.description);
    this.AssignProductForm = this.fb.group({
      vendor: ['', Validators.compose([Validators.required])]
    });

    this.getSupplierLists()
  }

  save() {
    this.dialogRef.close(this.AssignProductForm.value);
  }

  close() {
    this.dialogRef.close();
  }

  getSupplierLists() {
    this.supplierService.getSupplierList().subscribe(suppliers => {
      // console.log('supplier data : ', suppliers)
      this.suppliers = suppliers.data;
    }, error => {
      console.log('Error :', error);
    });
  }

}