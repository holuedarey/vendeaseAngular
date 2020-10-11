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
      group[`item${item}`] = new FormControl('');
      group[`other${item}`] = new FormControl('');
    }
    this.RepurchaseForm = new FormGroup(group);
  }
  save() {
    let check = confirm("Are you sure u want to Proceed");
    if(check == true){
    for (const index in this.orderProducts) {
      
      const  itemIndex = `item${index}`;
      const nameIndex = `name${index}`;
      const quantityIndex = `other${index}`;
      const descriptionIndex = `description${index}`;

      const repurchase = {
        item: this.RepurchaseForm.value[itemIndex],
        name: this.RepurchaseForm.value[nameIndex],
        description: this.RepurchaseForm.value[descriptionIndex],
        quantity: this.RepurchaseForm.value[quantityIndex],
      }
      this.items = this.items.concat(repurchase)
    }
    console.log('data : ', this.items);
    this.dialogRef.close(this.items);
  }else{
    console.log("cancel")
  }
  }
  close() {
    this.dialogRef.close();
  }

}
