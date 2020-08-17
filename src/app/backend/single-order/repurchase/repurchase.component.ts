import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-repurchase',
  templateUrl: './repurchase.component.html',
  styleUrls: ['./repurchase.component.css']
})
export class RepurchaseComponent implements OnInit {

  orderProducts: any;
  order_number:any;
  constructor(
    private dialogRef: MatDialogRef<RepurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    const parse = JSON.parse(data.data);

    this.orderProducts = parse.orderProducts;
    this.order_number = parse.order_number;
    


  }

  ngOnInit(): void {
  }
  save() {
    const payload = {
      type:"clone",
      order_number:this.order_number
    }
    this.dialogRef.close(payload);

  }
  close() {
    this.dialogRef.close();
  }

}
