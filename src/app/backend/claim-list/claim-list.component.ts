import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../_services/claims.service';
import { NavigationExtras, Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ClaimComponent } from '../invoice-list/claim/claim.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {

  isLoadingClaimList:boolean;
  breadCrumb: any = {
    firstLabel: 'Claim List',
    secondLabel:'Claim List',
    url: 'claim-list',
    secondLevel:false
  };
  claims:any[] = [];
  secondLevel:boolean = true;
  label:'test';
  url:'test'
  
  constructor(
    private claimService:ClaimsService, 
    private router:Router,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClaims()
  }

  getClaims(){
    this.isLoadingClaimList = true;
    this.claimService.listClaims().subscribe(claims => {
      console.log('claims data : ', claims)
      this.claims = claims.data.slice().reverse();;

      this.isLoadingClaimList = false;
    }, error => {
      console.log('Error :', error);
      this.isLoadingClaimList = false;
    });
  }

  viewClaim(claim) {
    // console.log('log : ', invoice);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        details: claim.short_code
      }
    };
    this.router.navigate(['view/claim'], navigationExtras)
  }

  
  claim(invoice) {
    // console.log('user data : ', user)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '600px';
    dialogConfig.position = {
      'top': '50px',

    };

    dialogConfig.data = {
      data: JSON.stringify(invoice)
    };

    const dialogRef = this.dialog.open(ClaimComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      payloadData => {
        console.log('status : ', payloadData)
        if (payloadData) {
          this.claimService.openClaims(payloadData).subscribe(users => {
            this.toastr.success("Claim Updated Successfully", 'Successful', {
              timeOut: 3000,
              closeButton: true
            });
            this.getClaims();
          }, error => {
            console.log('Error :', error);
            this.isLoadingClaimList = false;

            this.toastr.warning(error.error.message, 'Error', {
              timeOut: 3000,
              closeButton: true
            });

          });
        }

      }
    );
  }

}
