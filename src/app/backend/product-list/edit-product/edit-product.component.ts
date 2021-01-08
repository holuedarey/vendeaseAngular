import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  data: any;
  productData: any
  userData: any;

  name: any;
  brand: any;
  description: any;
  price: any;
  category: any;

  EditProductForm: FormGroup;


  categories: any[] = ['perishable', 'non perishable', 'miscellaneous'];
  discountType:any;

  discountTypes: any[] = ['value', 'percentage'];
  discountValue: any;
  isLoadingProduct:boolean;

  constructor(
    private product:ProductService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.data = JSON.parse(data.data);
    this.userData = this.data[1];
    this.productData = this.data[0];
    
    // console.log('product :', this.productData)

  }

  getProductCategoriesList() {
    this.isLoadingProduct = true;
    this.product.produtCategories().subscribe((product) => {
      console.log('product List data :', product);
     
      this.isLoadingProduct = false;
      this.categories = product.categories;
    }, error => {
      this.isLoadingProduct = false;
      console.log('Error :', error)
    })
  }
  ngOnInit(): void {
    // console.log('data user:', this.data[1]);
    this.getProductCategoriesList();
    const discountType = this.productData.discount  ? this.productData.discount.discount_type : this.discountTypes[0];
    const discountValue = this.productData.discount ? this.productData.discount.discount_value : "";
    console.log('dv : ', discountType);
    
    this.EditProductForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      brand: ['', Validators.compose([Validators.required])],
      category: [this.productData.category, ''],
      discountType: [discountType, ''],
      discountValue: [discountValue, ''],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    });

    //form data
    this.name = this.productData.name;
    this.brand = this.productData.brand;
    this.description = this.productData.description;
    this.price = this.productData.price;
    this.discountValue = discountValue;
    console.log('discountType' , discountType);
    
    // this.discountType = discountType
    // this.EditProductForm.setValue(this.category)
  }


  save() {
    const payload = {
      "name": this.EditProductForm.value.name,
      "description": this.EditProductForm.value.description,
      "brand": this.EditProductForm.value.breand, 
      "price": this.EditProductForm.value.price,
      "category": this.EditProductForm.value.category,
      "discount": {
        "discount_type": this.EditProductForm.value.discountType,
        "discount_value": this.EditProductForm.value.discountValue
      }
    }
    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }
}
