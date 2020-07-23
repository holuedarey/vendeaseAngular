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

  EditProductForm: FormGroup;
  constructor(
    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.data = JSON.parse(data.data);
    this.userData = this.data[1];
    this.productData = this.data[0];
  
  }

  ngOnInit(): void {
    console.log('data user:', this.data[1]);
    console.log('data product:', this.data[0]);
    this.EditProductForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      brand: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    });
  }


  save() {
    this.dialogRef.close(this.EditProductForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
