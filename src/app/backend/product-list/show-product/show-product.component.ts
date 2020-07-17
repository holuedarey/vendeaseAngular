import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  description: any;
  name: any;
  phone: any;
  AssignProductForm:FormGroup;
  constructor(
    private fb:FormBuilder,
     private dialogRef: MatDialogRef<ShowProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    
    this.description = JSON.parse(data.data);

    this.name = this.description.name;
    this.phone = this.description.phone
   }

  ngOnInit(): void {
    console.log('data comp:', this.description);
    this.AssignProductForm = this.fb.group({
      name: [name, []],
      phone: ['', []],

    });
  }

  save() {
    this.dialogRef.close(this.AssignProductForm.value);
  }

  close() {
    this.dialogRef.close();
  }


}
