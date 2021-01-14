import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../_services/product.service';
import { ConfirmDialogComponent } from '../user-management/confirm-dialog/confirm-dialog.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  breadCrumb: any = {
    firstLabel: 'Setting Page',
    secondLabel: 'Settings',
    url: '',
    secondLevel: false
  };
  isLoadingProduct: boolean;
  categories: any[] = ['perishable', 'non perishable', 'miscellaneous'];
  discountTypes: any[] = ['value', 'percentage'];

  constructor( private dialog: MatDialog, private fb: FormBuilder, private product: ProductService, private toastr: ToastrService) {

  }

  getProductCategoriesList() {
    this.isLoadingProduct = true;
    this.product.produtCategories().subscribe((product) => {
      console.log('product List data :', product.data);

      this.isLoadingProduct = false;
      this.categories = product.data;
    }, error => {
      this.isLoadingProduct = false;
      console.log('Error :', error)
    })
  }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      category: ['', ''],
      discountType: [this.discountTypes[0], ''],
      discountValue: ['', ''],
    });
    this.getProductCategoriesList();
  }

  submit() {
    const payload = {
      "name": this.settingsForm.value.category,
      "discount": {
        "discount_type": this.settingsForm.value.discountType,
        "discount_value": this.settingsForm.value.discountValue
      }
    }
    console.log('payload : ', payload);
    
    this.product.createProductCatogory(payload).subscribe((product) => {
      console.log('product List data :', product)
      this.toastr.success("Product Category created Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.settingsForm.reset();
      this.getProductCategoriesList();
    }, error => {
      this.toastr.warning("Error Creating the Record", 'Failure', {
        timeOut: 3000,
        closeButton: true
      });
      console.log('Error :', error)
    })
  }

  editCategory(category){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    dialogConfig.position = {
      'top': '50px',
    };

    dialogConfig.data = {
      data: JSON.stringify(category)
    };

    const dialogRef = this.dialog.open(EditCategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close();
        console.log('Yes clicked');
        this.isLoadingProduct = true;
        console.log('second payload : ', result);
        
        this.product.updateProductCategory(category._id, result).subscribe((product) => {
          console.log('product List data :', product)
          this.toastr.success("Product Category Updated Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });
          this.settingsForm.reset();
          this.getProductCategoriesList()
        }, error => {
          this.toastr.warning("Error Updating the Record", 'Failure', {
            timeOut: 3000,
            closeButton: true
          });
          console.log('Error :', error)
        })
      }
    });

   
  }

  deleteCategory(category) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '150px';
    dialogConfig.width = '300px';
    dialogConfig.position = {
      'top': '50px',
    };

    dialogConfig.data = {
      data: JSON.stringify(category)
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close();
        console.log('Yes clicked');
        this.isLoadingProduct = true;
        this.product.deleteProductCategory(category._id, { "discount_deleted": true }).subscribe(users => {
          // this.getUserLists();
          this.toastr.success("Category Deleted Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });

          this.isLoadingProduct = false;
          this.getProductCategoriesList();

        }, error => {
          console.log('Error :', error);
          this.isLoadingProduct = false;
        });
      }
    });
  }
  
}
