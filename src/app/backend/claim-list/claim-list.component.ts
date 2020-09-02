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
  breadCrumb: string = 'Claim  List';
  claims:any[] = [];
  constructor(
    private claimService:ClaimsService, 
    private router:Router,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  getClaims(){
    this.isLoadingClaimList = true;
    this.claimService.listClaims().subscribe(compannies => {
      console.log('claims data : ', compannies)
      this.claims = compannies.data;

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
        details: claim._id
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
