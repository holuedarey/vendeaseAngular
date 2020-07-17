import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ShowProductComponent } from './show-product/show-product.component';
import { ConfirmDialogComponent } from '../user-management/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isLoadingProduct: boolean;
  products: any[] = [];
  userData: any;

  constructor(private product: ProductService, public storageService: StorageService, private dialog: MatDialog,  private toastr: ToastrService) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
  }

  ngOnInit(): void {
    this.getProductList();
  }

  async getProductList() {
    this.isLoadingProduct = true;
    this.product.produtList().subscribe((product) => {
      console.log('product List data :', product.data)
      this.isLoadingProduct = false;
      return this.products = product.data
    }, error => {
      this.isLoadingProduct = false;
      console.log('Error :', error)
    })
  }


  showAssignProduct(product) {
    // console.log('user data : ', user)
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '450px';
    dialogConfig.position = {
      'top': '50px',

    };

    dialogConfig.data = {
      data: JSON.stringify(product)
    };
    this.dialog.open(ShowProductComponent, dialogConfig)

    const dialogRef = this.dialog.open(ShowProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

  editProduct(product) {
    // console.log('user data : ', user)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '450px';
    dialogConfig.position = {
      'top': '50px',

    };

    dialogConfig.data = {
      data: JSON.stringify(product)
    };
    this.dialog.open(ShowProductComponent, dialogConfig)

    const dialogRef = this.dialog.open(ShowProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
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
      if(data){
        dialogRef.close();
        console.log('Yes clicked');
        this.isLoadingProduct = true;
        this.product.deleteProduct(product).subscribe(users => {
          // this.getUserLists();
          this.toastr.success("User Deleted Successfully", 'Successful', {
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
