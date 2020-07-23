import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  data:any;
  productData:any
  userData:any;

  name:any;
  brand:any;
  description:any;
  price:any;
  category:any;
  
  EditProductForm: FormGroup;


  categories:any[] = ['perishable', 'non perishable', 'miscellaneous']
  constructor(
    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.data = JSON.parse(data.data);
    this.userData = this.data[1];
    this.productData = this.data[0];
    // console.log('product :', this.productData)
   
  }

  ngOnInit(): void {
    // console.log('data user:', this.data[1]);
    // console.log('data product:', this.data[0]);
    this.EditProductForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      brand: ['', Validators.compose([Validators.required])],
      category: [this.productData.category,''],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    });

    //form data
    this.name = this.productData.name;
    this.brand = this.productData.brand;
    this.description = this.productData.description;
    this.price = this.productData.price;

    // this.EditProductForm.setValue(this.category)
  }


  save() {
    this.dialogRef.close(this.EditProductForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
