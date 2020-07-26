import { Component, OnInit } from '@angular/core';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpEvent } from '@angular/common/http';

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
  progress: number = 0;
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
      documents: [''],
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
      const file = (event.target as HTMLInputElement).files[0];

      this.CreateProductFormUpload.patchValue({
        documents: file
      });
      this.CreateProductFormUpload.get('documents').updateValueAndValidity()
      // console.log('file :', this.CreateProductFormUpload.get('documents'));
    }
  }


  async createPoductUpload() {

    // console.log('file :', this.CreateProductFormUpload.value.documents)
    this.isLoadingProductUpload = true;
    console.log('payload : ', this.CreateProductFormUpload.value.documents.name)
    var formData = new FormData();
    formData.append("uri", this.CreateProductFormUpload.value.documents, this.CreateProductFormUpload.value.documents.name);

    console.log('payload : ', formData)
    this.product.createProductUpload(this.CreateProductFormUpload.value.documents).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    })
  }
}
