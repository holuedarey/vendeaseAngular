import { Component, OnInit } from '@angular/core';
import { Constants } from '../../common/constant';
import { DasboardService } from '../../_services/dasboard.service';
import { StorageService } from '../../_service/storage.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ClaimComponent } from './claim/claim.component';
import { ClaimsService } from '../../_services/claims.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  isLoadingInvoice: boolean;
  invoices: any[] = [];
  userData: any;
  breadCrumb: any = {
    firstLabel: 'Invoice List',
    secondLabel:'Invoice List',
    url: 'invoice-list',
    secondLevel:false
  };
  searchInvoiceForm:FormGroup;

  constructor(
    private dashboard: DasboardService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private fb:FormBuilder,
    private claims: ClaimsService,
    private toastr: ToastrService,) {

      this.searchInvoiceForm = this.fb.group({
        search: ['', Validators.compose([Validators.required])],
      });
  }

  ngOnInit(): void {
    this.getInvoice();
    this.getUser();
  }

  searchInvoice(){
    const payload = this.searchInvoiceForm.value.search;
    if(payload == undefined) this.getInvoice();
    this.dashboard.searchInvoice(payload).subscribe(searchInvoice => {
      console.log('response :', searchInvoice);
      this.invoices = searchInvoice.data;
    }, error => {
      console.log('error : ', error);

    })
  }
  getUser() {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
  }

  getInvoice() {
    this.isLoadingInvoice = true;
    this.dashboard.invoice().subscribe((invoices) => {
      console.log('invoice data :', invoices.data)
      this.isLoadingInvoice = false;
      this.invoices = invoices.data
    }, error => {
      this.isLoadingInvoice = false;
      console.log('Error :', error)
    })
  }

  getSingleInvoice(invoice) {
    // console.log('log : ', invoice);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        details: invoice._id
      }
    };
    this.router.navigate(['view/invoice'], navigationExtras)
  }

  deleteInvoice(invoice) {
    this.isLoadingInvoice = true;
    this.dashboard.deleteInvoice(invoice._id).subscribe((invoice) => {
      this.isLoadingInvoice = false;
      
      this.toastr.success("User Updated Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.getInvoice();
    }, error => {
      this.isLoadingInvoice = false;
      console.log('Error :', error)
    })
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
          this.claims.openClaims(payloadData).subscribe(users => {
            this.toastr.success("User Updated Successfully", 'Successful', {
              timeOut: 3000,
              closeButton: true
            });
            this.getInvoice();
          }, error => {
            console.log('Error :', error);
            this.isLoadingInvoice = false;

            this.toastr.warning(error.error.message, 'Successful', {
              timeOut: 3000,
              closeButton: true
            });

          });
        }

      }
    );
  }

}
