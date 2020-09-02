import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { ClaimsService } from '../../_services/claims.service';

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
    url: 'claim-list',
    secondLevel:true
  };
  constructor( private route: ActivatedRoute,
    private storageService:StorageService,
    private claimService:ClaimsService) { 
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];
      const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
      this.userData = theData;
      console.log('details : ', this.userData);
    });
  }

  ngOnInit(): void {
    this.claimDetails();
    this.breadCrumb.secondLabel = this.claimId;
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
}
