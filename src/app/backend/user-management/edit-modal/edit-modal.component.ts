import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
    console.log('data comp:', this.description);
    this.EditUserForm = this.fb.group({
      name: [name, []],
      phone: ['', []],

    });
  }

  save() {
    this.dialogRef.close(this.EditUserForm.value);
}

close() {
    this.dialogRef.close();
}

}
