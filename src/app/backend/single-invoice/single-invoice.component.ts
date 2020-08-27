import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../user-management/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { PaylaterComponent } from './paylater/paylater.component';
import { PaymentService } from '../../_services/payment.service';

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrls: ['./single-invoice.component.css']
})
export class SingleInvoiceComponent implements OnInit {

  data: any;
  isLoadingDetail: boolean;
  invoice: any;
  invoiceNumber: any
  order_number;
  paid: any;
  payment_date: any;
  overDue: any;

  company_details_name: any;
  items: any[] = [];

  others: any[] = [];
  createdAt: any;
  sub_total;
  grand_total;

  deafaultDate: any = new Date().toISOString();
  detail: any;
  invoiceApproved: any;
  userData: any;

  isLoadingApprove: boolean;
  invoiceId: any;

  reference = '';
  title: any;

  companyId:any;

  constructor(
    private dashboard: DasboardService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private dialog: MatDialog,
    private toastr: ToastrService,) {
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];
      this.invoiceId = this.detail;
      const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
      this.userData = theData;
      console.log('details : ', this.userData);

    });
  }

  ngOnInit(): void {
    this.invoiceDetails();
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)).toISOString();
    console.log('date in 5days', date);
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  invoiceDetails() {
    this.isLoadingDetail = true;

    this.dashboard.getInvoice(this.detail).subscribe( async (invoice) => {
      this.isLoadingDetail = false;
      console.log('invoice single data :', invoice)
      this.invoice = await invoice.data;
      this.invoiceNumber = invoice.invoice_number;
      this.order_number = invoice.order_number;
      this.companyId = invoice.company_details.id;
      this.paid = invoice.paid;
      this.payment_date = invoice.payment_date;
      this.overDue = date_diff_indays(this.deafaultDate, this.payment_date);
      this.company_details_name = invoice.company_details.name || null;
      this.items = invoice.items || [];
      this.others = invoice.other || [];
      this.createdAt = invoice.createdAt;
      this.invoiceApproved = invoice.approved;
      this.sub_total = invoice.sub_total || 0;
      this.grand_total = invoice.grand_total || 0;
      console.log('total :', this.payment_date)
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }

  approveInvoice() {
    // return;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '130px';
    dialogConfig.width = '250px';
    dialogConfig.position = {
      'top': '50px',
    };

    dialogConfig.data = {
      data: JSON.stringify(this.invoiceId)
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close();
        console.log('Yes clicked');
        this.isLoadingApprove = true;
        this.dashboard.approveInvoice(this.invoiceId, { action: "approve" }).subscribe(users => {
          // this.getUserLists();
          this.toastr.success("Invoice Approved Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });

          this.isLoadingApprove = false;
          this.invoiceDetails();
        }, error => {
          console.log('Error :', error);
          this.isLoadingApprove = false;
        });
      }
    });
  }

  payLater() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '320px';
    dialogConfig.width = '400px';
    dialogConfig.position = {
      'top': '50px',
    };

    dialogConfig.data = {
      data: JSON.stringify(this.invoiceId)
    };
    const dialogRef = this.dialog.open(PaylaterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingApprove = true;
        const currentDate = new Date().toISOString();
        const nexDate = currentDate + result
        // this.dashboard.approveInvoice(this.invoiceId, {action: "approve"}).subscribe(users => {
        //   // this.getUserLists();
        //   this.toastr.success("Invoice Approved Successfully", 'Successful', {
        //     timeOut: 3000,
        //     closeButton: true
        //   });

        //   this.isLoadingApprove = false;
        //   this.invoiceDetails();

        //   // this.loader.hideLoader();
        // }, error => {
        //   console.log('Error :', error);
        //   this.isLoadingApprove = false;
        //   // this.loader.presentToast(error.error.message);
        //   // this.loader.hideLoader();

        // });
      }
    });
  }
  payNow() {
    const payload = { amount: this.grand_total, email: this.userData.email };
    this.paymentService.createAuthorizationUrl(payload).subscribe(payment => {
      console.log(payment)
      
      window.location.href = `${payment.authorization_url}`;
      // this.router.navigate([])
    }, error => {
      console.log('Error : ', error)
    })
  }

  paymentInit(event) {
    console.log('Payment initialized', event);
  }

  paymentDone(event) {
    this.title = 'Payment successfull';
    console.log(this.title, event);
    const payload = {
      type: "verify",
      value: this.reference,
      invoice_number: this.invoiceNumber,
      company: this.companyId
    }
    this.paymentService.verifyPayment(payload).subscribe(payment => {
      console.log('resp: ', payment)
      this.toastr.success("Payment Approved Successfully", 'Successful', {
        timeOut: 5000,
        closeButton: true
      });
      this.invoiceDetails();
    }, error => {
      console.log('Error : ', error)
    })    
  }

  paymentCancel() {
    console.log('payment failed');
  }
  
}


var date_diff_indays = function (date1, date2) {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}