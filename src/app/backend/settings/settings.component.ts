import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../_services/product.service';

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

  constructor(private fb: FormBuilder, private product: ProductService, private toastr: ToastrService) {

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
    this.settingsForm = this.fb.group({
      category: [this.categories[0], ''],
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
    }, error => {
      this.toastr.warning("Error Creating the Record", 'Failure', {
        timeOut: 3000,
        closeButton: true
      });
      console.log('Error :', error)
    })
  }
}
