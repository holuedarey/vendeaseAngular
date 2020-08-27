import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-paylater',
  templateUrl: './paylater.component.html',
  styleUrls: ['./paylater.component.css']
})
export class PaylaterComponent implements OnInit {

  PaylaterForm: FormGroup;

  data: any;
  date: any[] = [7, 14, 21, 30]
  startDate = new FormControl(new Date());
  minDate: any;
  maxDate: any;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<PaylaterComponent>) {

    this.minDate = new Date();
    this.maxDate = new Date().setTime(this.minDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    console.log('date max:', new Date(this.maxDate))
    console.log('date min:', new Date(this.minDate))
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day != day  && day > 7;
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
