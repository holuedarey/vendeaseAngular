import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from '../../../_service/storage.service';
import { Constants } from '../../../common/constant';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  description:any;
  ClaimForm:FormGroup;
  userData:any;

  constructor(
    private fb: FormBuilder,
    public storageService:StorageService,
    private dialogRef: MatDialogRef<ClaimComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = JSON.parse(data.data);
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
  }
  ngOnInit(): void {
     console.log('data comp:', this.description);
     this.ClaimForm = this.fb.group({
      subject: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    });
  }

  
  save() {
    const payload = {
      claims: this.ClaimForm.value.subject,
      message: this.ClaimForm.value.message,
      invoice_no: this.description.invoice_number,
      company: this.userData.company.id
    }
    // console.log('data payload: ', payload);

    this.dialogRef.close(payload)
  }

  close() {
    this.dialogRef.close();
  }

}
