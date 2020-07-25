import { Component, OnInit } from '@angular/core';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  userData: any;
  categories: any[] = ['perishable', 'non perishable', 'miscellaneous'];

  CreateProductForm: FormGroup;
  CreateProductFormUpload: FormGroup;
  isLoadingProduct: boolean;
  isLoadingProductUpload: boolean;
  file: File = null;
  constructor(public storageService: StorageService, private fb: FormBuilder, private product: ProductService, private toastr: ToastrService) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.CreateProductForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      brand: ['', Validators.compose([Validators.required])],
      category: [this.categories[0], ''],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    });


    this.CreateProductFormUpload = this.fb.group({
      documents: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  async createPoduct() {
    const payload = {
      name: this.CreateProductForm.value.name,
      description: this.CreateProductForm.value.description,
      brand: this.CreateProductForm.value.brand,
      price: this.CreateProductForm.value.price
    }
    this.isLoadingProduct = true;
    console.log('payload :', payload)
    this.product.createProduct(payload).subscribe((product) => {
      console.log('product List data :', product)
      this.isLoadingProduct = false;
      this.toastr.success("Product Created Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
    }, error => {
      this.isLoadingProduct = false;
      this.toastr.warning("an Error occured while creating  Product", 'Error', {
        timeOut: 3000,
        closeButton: true
      });
      console.log('Error :', error)
    })
  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];

      this.CreateProductFormUpload.get('documents').setValue(this.file);
      console.log('file :', this.file);
    }
  }


  async createPoductUpload() {

    const formData = new FormData();
    formData.append('uri', this.file, this.file.name);
    console.log('file :', formData)
    this.isLoadingProductUpload = true;
    // this.product.createProductUpload(payload).subscribe((product) => {
    //   console.log('product List data :', product)
    //   this.isLoadingProductUpload = false;
    //   this.toastr.success("Product Created Successfully", 'Successful', {
    //     timeOut: 3000,
    //     closeButton: true
    //   });
    // }, error => {
    //   this.isLoadingProductUpload = false;
    //   this.toastr.warning("an Error occured while creating  Product", 'Error', {
    //     timeOut: 3000,
    //     closeButton: true
    //   });
    //   console.log('Error :', error)
    // })
  }
}
