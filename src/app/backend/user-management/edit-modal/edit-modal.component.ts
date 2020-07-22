import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  EditUserForm: FormGroup;
  description: any;
  name: any;
  phone: any
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = JSON.parse(data.data);
    this.name = this.description.name;
    this.phone = this.description.phone
  }

  ngOnInit(): void {
    // console.log('data comp:', this.description);
    this.EditUserForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }

  save() {
    const payload = {
      name: this.EditUserForm.value.name,
      phone: this.EditUserForm.value.phone
    }
    // console.log('data payload: ', payload);

    this.dialogRef.close(payload)
  }

  close() {
    this.dialogRef.close();
  }

}
