import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { ClaimsService } from '../../_services/claims.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-claim',
  templateUrl: './single-claim.component.html',
  styleUrls: ['./single-claim.component.css']
})
export class SingleClaimComponent implements OnInit {

  detail:any;
  invoiceId:any;
  userData:any;
  isLoadingDetail:boolean;

  status:any;
  claim:any;

  conversations:any[] = [];
  claimId:any;
  breadCrumb: any = {
    firstLabel: 'Claim List',
    secondLabel:'',
    url: '/claim-list',
    secondLevel:true
  };

  ReplyClaimForm: FormGroup;
  @ViewChild('closebutton') closebutton;
  constructor( private route: ActivatedRoute,
    private storageService:StorageService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private claimService:ClaimsService) { 
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];

      const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
      this.userData = theData;
      console.log('details : ', this.userData);
    });

    this.ReplyClaimForm = this.fb.group({
      message: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.claimDetails();
    this.breadCrumb.secondLabel = `Claim #${this.detail}`;
  }


  claimDetails() {
    this.isLoadingDetail = true;

    this.claimService.getClaims(this.detail).subscribe(claim => {
      this.isLoadingDetail = false;
      this.conversations = claim.data
      console.log('claim single data :', claim.data)
      // this.status = claim.status;
      this.claimId = claim.short_code;

      //todo show appropriate data to the view
      
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }

  replyClaim(){
    const payload = {
      short_code:this.detail,
      message: this.ReplyClaimForm.value.message,
    }

    this.claimService.replyClaims(payload).subscribe(claim => {
      this.closebutton.nativeElement.click();
      this.toastr.success("Product Created Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.claimDetails();
    }, error =>{
      this.closebutton.nativeElement.click();
      console.log('error ; ', error)
    });
    console.log('payload ', payload);
  }
}
