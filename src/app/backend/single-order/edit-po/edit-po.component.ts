import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.css']
})
export class EditPoComponent implements OnInit {
  EditPoForm: FormGroup;
  data: any;
  quantity: any;
  description: any
  _id: any;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPoComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = JSON.parse(data.data);
    this.quantity = this.data.quantity;
    this.description = this.data.description;
    this._id = this.data._id;
    console.log('data :', this.description);


  }

  ngOnInit(): void {
    this.EditPoForm = this.fb.group({
      quantity: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });

  }

  save() {
    const payload = {
      action: "patch",
      id: this._id,
      quantity: this.EditPoForm.value.quantity,
      description: this.EditPoForm.value.description
    }
    this.dialogRef.close(payload);

  }
  close() {
    this.dialogRef.close();
  }
}
