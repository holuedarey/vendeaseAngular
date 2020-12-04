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
  selectedFiles: File = null;

  breadCrumb: any = {
    firstLabel: 'Product List',
    secondLabel: 'Create Product',
    url: '/product-list',
    secondLevel: true
  };

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
      category: this.CreateProductForm.value.catgory,
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
      this.selectedFiles = event.target.files[0];
      const currentFileUpload = this.selectedFiles;
      console.log(currentFileUpload)
      this.CreateProductFormUpload.get('documents').setValue(currentFileUpload);
    }

  }


  async createPoductUpload() {

    // console.log('file :', this.CreateProductFormUpload.value.documents)
    this.isLoadingProductUpload = true;
    // console.log('payload : ', this.CreateProductFormUpload.value.documents.name)
    var formData = new FormData();
    formData.append("uri", this.CreateProductFormUpload.get("documents").value, this.CreateProductFormUpload.get("documents").value.name,);

    console.log('form Data', JSON.stringify(formData), this.CreateProductFormUpload.get("documents").value,)
    formData.append("test", "value")
    console.log('payload : ', formData)
    this.product.createProductUpload(formData).subscribe((event: HttpEvent<any>) => {
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
          this.toastr.success(event.body.message, 'Successful', {
            timeOut: 3000,
            closeButton: true
          });
          this.CreateProductFormUpload.reset();
          setTimeout(() => {
            this.progress = 0;
           
          }, 1500);
      }
     
    })
  }
}
