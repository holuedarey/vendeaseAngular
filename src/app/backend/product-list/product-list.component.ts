import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ShowProductComponent } from './show-product/show-product.component';
import { ConfirmDialogComponent } from '../user-management/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isLoadingProduct: boolean;
  products: any[] = [];
  userData: any;
  serial:any;
  breadCrumb: any = {
    firstLabel: 'Purchase Order',
    secondLabel:'Product List',
    url: 'product-list',
    secondLevel:false
  };

  searchProductForm: FormGroup;

  p: number = 1;
  limit:any = 50;
  skip:any;
  totalItems:any;

  constructor(private product: ProductService, public storageService: StorageService, private dialog: MatDialog, private toastr: ToastrService, private fb: FormBuilder) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.searchProductForm = this.fb.group({
      search: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.isLoadingProduct = true;
    this.product.produtList({skip:0, limit: this.limit}).subscribe((product) => {
      console.log('product List data :', product.data);
      this.totalItems = product.total;
      this.isLoadingProduct = false;
      this.products = product.data.slice().reverse();
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      this.isLoadingProduct = false;
      console.log('Error :', error)
    })
  }

  pageChanged(event){
    this.skip = (event - 1) * this.limit;
    this.p = event;
    this.product.produtList({skip:this.skip, limit: this.limit}).subscribe((product) => {
      console.log('product List data :', product.data);
      this.totalItems = product.total;
      this.isLoadingProduct = false;
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
      return this.products = product.data.slice().reverse();
    }, error => {
      this.isLoadingProduct = false;
      console.log('Error :', error)
    })
  }


  searchProductByName(){
    const payload = this.searchProductForm.value.search;
    if(payload == undefined) this.getProductList();
    this.product.searchProduct(payload).subscribe(searchProduct => {
      console.log('response :', searchProduct);
      return this.products = searchProduct.data.slice().reverse();
    }, error => {
      console.log('error : ', error);

    })
  }

  showAssignProduct(product) {
    // console.log('user data : ', user)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '200px';
    dialogConfig.width = '450px';
    dialogConfig.position = {
      'top': '50px',

    };

    dialogConfig.data = {
      data: JSON.stringify(product)
    };

    const dialogRef = this.dialog.open(ShowProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {

          if (data) {

            const productId = product._id;
            this.product.updateProduct(productId, data).subscribe((product) => {
              console.log('product List data :', product.data)
              this.toastr.success("Product Updated Successfully", 'Successful', {
                timeOut: 3000,
                closeButton: true
              });
              this.getProductList();
            }, error => {
              this.toastr.warning("Error Updating the Record", 'Failure', {
                timeOut: 3000,
                closeButton: true
              });
              console.log('Error :', error)
            })
          }
        }
    );
  }

  editProduct(product) {
    // console.log('user data : ', user)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '550px';
    dialogConfig.position = {
      'top': '50px',

    };

    const data = [product, this.userData]
    dialogConfig.data = {
      data: JSON.stringify(data)
    };

    const dialogRef = this.dialog.open(EditProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            console.log("Dialog output:", data)

            const productId = product._id;
            this.product.updateProduct(productId, data).subscribe((product) => {
              console.log('product List data :', product.data)
              this.toastr.success("Product Updated Successfully", 'Successful', {
                timeOut: 3000,
                closeButton: true
              });
              this.getProductList();
            }, error => {
              this.toastr.warning("Error Updating the Record", 'Failure', {
                timeOut: 3000,
                closeButton: true
              });
              console.log('Error :', error)
            })
          }
        }
    );
  }

  deleteProduct(product) {
    // console.log('user data : ', user)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '130px';
    dialogConfig.width = '250px';
    dialogConfig.position = {
      'top': '50px',

    };

    dialogConfig.data = {
      data: JSON.stringify(product)
    };
    this.dialog.open(ConfirmDialogComponent, dialogConfig)

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
          if (data) {
            this.isLoadingProduct = true;
            this.product.deleteProduct(product).subscribe(users => {
              // this.getUserLists();
              this.toastr.success("Product Deleted Successfully", 'Successful', {
                timeOut: 3000,
                closeButton: true
              });

              this.isLoadingProduct = false;
              this.getProductList();

              // this.loader.hideLoader();
            }, error => {
              console.log('Error :', error);
              this.isLoadingProduct = false;
              // this.loader.presentToast(error.error.message);
              // this.loader.hideLoader();

            });
          }
        }
    );
  }

}
