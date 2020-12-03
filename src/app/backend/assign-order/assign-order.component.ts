import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from '../../_services/supplier.service';

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.css']
})
export class AssignOrderComponent implements OnInit {

  AssignPoForm:FormGroup;
  vendors:any[] = [];
  isLoadingSupplier:boolean;

  constructor(private fb:FormBuilder, private vendorService: SupplierService, private dialogRef: MatDialogRef<AssignOrderComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
    this.AssignPoForm = this.fb.group({
      vendor: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getVendorList()
  }

  save(){
    const payload = {
      vendor: this.AssignPoForm.value.vendor,
    }
    this.dialogRef.close(payload)
  }
  
  close(){
    this.dialogRef.close()
  }
  getVendorList(){
    this.vendorService.getSupplierList({skip : 0, limit:Number.MAX_SAFE_INTEGER}).subscribe((order) => {
      // console.log('order list data :', order.data)
      this.isLoadingSupplier = false;
      this.vendors = order.data;
    }, error => {
      this.isLoadingSupplier = false;
      console.log('Error :', error)
    })
  }

}
