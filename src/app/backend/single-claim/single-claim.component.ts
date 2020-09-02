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
  }


  invoiceDetails() {
    this.isLoadingDetail = true;

    this.claimService.getClaims(this.detail).subscribe(async (invoice) => {
      this.isLoadingDetail = false;
      console.log('invoice single data :', invoice.data)
      //todo show appropriate data to the view
      
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }
}
