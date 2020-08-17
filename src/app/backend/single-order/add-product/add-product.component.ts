import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../../_services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  PurchaseOrderForm:FormGroup;
  products:any[] = [];
  _id: any;
  data:any;
  constructor(private productService:ProductService, private fb:FormBuilder, private dialogRef: MatDialogRef<AddProductComponent>,@Inject(MAT_DIALOG_DATA) data) { 
    this.data = JSON.parse(data.data);
    this._id = this.data._id;
    this.PurchaseOrderForm = this.fb.group({
      quantity: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.productListUser();
  }

  
  async productListUser() {
    this.productService.produtList().subscribe((product) => {
      this.products = product.data.slice().reverse()
      console.log('product :', this.products)
    }, error => {
      console.log('Error :', error)
    })
  }

  
  save() {
    const payload = {
      action: "add",
      product:{
        item:this.data._id,
        quantity:this.PurchaseOrderForm.value.quantity,
        name:this.PurchaseOrderForm.value.name,
        description:this.PurchaseOrderForm.value.description,
        price:this.PurchaseOrderForm.value.price,
      }
    }
   
    this.dialogRef.close(payload);

  }
  close() {
    this.dialogRef.close();
  }

}
