import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addfee-modal',
  templateUrl: './addfee-modal.component.html',
  styleUrls: ['./addfee-modal.component.css']
})
export class AddfeeModalComponent implements OnInit {

  adminFeeForm: FormGroup;
  description: any;
  admin_fee: any;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddfeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = JSON.parse(data.data);
    this.admin_fee =  this.description.company.admin_fee;
  }

  ngOnInit(): void {
    this.adminFeeForm = this.fb.group({
      admin_fee: ['', Validators.compose([Validators.required])],
    });
  }

  save() {
    const payload = {
      admin_fee: this.adminFeeForm.value.admin_fee,
      action: "set_admin_fee",
      company: this.description['company'].id
    }
    console.log('data payload: ', payload);

    this.dialogRef.close(payload)
  }

  close() {
    this.dialogRef.close();
  }
}
