import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  settingsForm: FormGroup;
  discountTypes: any[] = ['value', 'percentage'];
  data: any;

  discountType: any;
  discountValue: any;
  title:any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.data = JSON.parse(data.data);

    console.log('incoming data : ', data);

  }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      discountType: [this.discountTypes[0], ''],
      discountValue: ['', ''],
    });

    this.discountValue = this.data.discount.discount_value;
    this.discountType = this.data.discount.discount_type;
    this.title = this.data.name;
  }

  save() {
    const payload = {
      "discount": {
        "discount_type": this.settingsForm.value.discountType,
        "discount_value": this.settingsForm.value.discountValue
      }
    }

    this.dialogRef.close(payload)
    console.log('first payload : ', payload);
    
  }
  close() {
    this.dialogRef.close()
  }
}
