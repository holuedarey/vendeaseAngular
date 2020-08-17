import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-paylater',
  templateUrl: './paylater.component.html',
  styleUrls: ['./paylater.component.css']
})
export class PaylaterComponent implements OnInit {

  PaylaterForm:FormGroup;
  
  data:any;
  date:any[] = [7,14,21,30]
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<PaylaterComponent>) {
  }

  ngOnInit(): void {
    this.PaylaterForm = this.fb.group({
      payment_date: [this.date[0], '']
    });
  }

  
  save() {
    this.dialogRef.close(this.PaylaterForm.value.payment_date)
  }

  close() {
    this.dialogRef.close();
  }

}
