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

  isLoadingClaimList: boolean;
  breadCrumb: any = {
    firstLabel: 'Claim List',
    secondLabel: 'Claim List',
    url: 'claim-list',
    secondLevel: false
  };
  claims: any[] = [];
  secondLevel: boolean = true;
  label: 'test';
  url: 'test'
  p: number = 1;
  limit: any = 50;
  skip: any;
  totalItems: any;
  serial: any;

  constructor(
    private claimService: ClaimsService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClaims()
  }

  getClaims() {
    this.isLoadingClaimList = true;
    this.claimService.listClaims({ skip: 0, limit: this.limit }).subscribe(claims => {
      console.log('claims data : ', claims.total)
      this.totalItems = claims.total;
      this.claims = claims.data.slice().reverse();

      this.isLoadingClaimList = false;
      this.serial = 1 + (this.p - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      console.log('Error :', error);
      this.isLoadingClaimList = false;
    });
  }

  pageChanged(event) {
    this.skip = (event - 1) * this.limit;
    this.p = event;
    this.claimService.listClaims({ skip: 0, limit: this.limit }).subscribe(delivery => {
      console.log('invoice data :', delivery.data)
      this.isLoadingClaimList = false;
      this.claims = delivery.data.slice().reverse();
      this.serial = 1 + (this.p - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      this.isLoadingClaimList = false;
      console.log('Error :', error)
    })
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
