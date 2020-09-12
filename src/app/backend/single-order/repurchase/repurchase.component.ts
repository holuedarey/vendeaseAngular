import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-repurchase',
  templateUrl: './repurchase.component.html',
  styleUrls: ['./repurchase.component.css']
})
export class RepurchaseComponent implements OnInit {

  orderProducts: any;
  order_number: any;

  RepurchaseForm: FormGroup;
  items:any[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RepurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    const parse = JSON.parse(data.data);

    this.orderProducts = parse.orderProducts;
    this.order_number = parse.order_number;

  }

  ngOnInit(): void {
    let group = {}
    this.orderProducts.forEach(input_template => {
      group[input_template.label] = new FormControl('');
    })
    for (const item in this.orderProducts) {
      group[`name${item}`] = new FormControl('');
      group[`quantity${item}`] = new FormControl('');
      group[`description${item}`] = new FormControl('');
    }
    this.RepurchaseForm = new FormGroup(group);
  }
  save() {
    const payload = {
      type: "clone",
      order_number: this.order_number
    }
    this.dialogRef.close(payload);

  }
  close() {
    

    // this.items = this.items.concat(item)
    for (const item in this.orderProducts) {
      // const item = {
      //   item: _id,
      //   name: name,
      //   quantity: this.purchaseOrderForm.value.quantity,
      //   description: this.purchaseOrderForm.value.description,
      // }
      this.items = this.items.concat(item)
    }

    console.log('data : ', this.RepurchaseForm.value);
    this.dialogRef.close();
  }

}
