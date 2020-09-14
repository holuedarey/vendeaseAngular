import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../user-management/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { PaylaterComponent } from './paylater/paylater.component';
import { PaymentService } from '../../_services/payment.service';
import { DeliveryService } from '../../_services/delivery.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { Observable } from 'rxjs';


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

  companyId: any;
  delivery_address: any;

  breadCrumb: any = {
    firstLabel: 'Invoice List',
    secondLabel: '',
    url: '/invoice-list',
    secondLevel: true
  };

  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'exportData',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };
  isShow: boolean = true;
  visible:boolean;
  constructor(
    private exportAsService: ExportAsService,
    private dashboard: DasboardService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private delivery: DeliveryService) {
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];
      this.invoiceId = this.detail;
      const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
      this.userData = theData;
      console.log('details : ', this.userData);

    });
  }

  exportAsString(type: SupportedExtensions, opt?: string) {
    this.config.elementIdOrContent = '<div> test string </div>';
    this.exportAs(type, opt);
    setTimeout(() => {
      this.config.elementIdOrContent = 'mytable';
    }, 1000);
  }

   exportAs(type: SupportedExtensions, opt?: string){
    this.isShow = false;
    this.visible = true;
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, this.detail).subscribe(() => {
      // save started

    });

    // location.reload()
    // this.exportAsService.get(this.config).subscribe(content => {
    //   const link = document.createElement('a');
    //   const fileName = `${this.detail}.pdf`;

    //   link.href = content;
    //   link.download = fileName;
    //   link.click();
    //   console.log(content);
    //   this.isShow = true;

    // }); 
  }

  pdfCallbackFn(pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

  ngOnInit(): void {
    this.invoiceDetails();
    this.breadCrumb.secondLabel = `Invoice #${this.detail}`;
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)).toISOString();
    console.log('date in 5days', date);
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    console.log('show :', this.isShow);
    this.visible = false;
  }

  invoiceDetails() {
    this.isLoadingDetail = true;

    this.dashboard.getInvoice(this.detail).subscribe((invoice) => {
      this.isLoadingDetail = false;
      console.log('invoice single data :', invoice)
      this.invoice = invoice.data;
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
      this.delivery_address = invoice.delivery_address;
      console.log('total :', this.payment_date)
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }

  // exportAs() {
  //   // download the file using old school javascript method
  //   this.exportAsService.save(this.exportAsConfig, this.detail).subscribe(() => {
  //     // save started
  //   });
  //   // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
  //   this.exportAsService.get(this.exportAsConfig).subscribe(content => {
  //     console.log(content);
  //   });
  // }

  approveInvoice() {
    // return;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '230px';
    dialogConfig.width = '300px';
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
        console.log('responsee : ', result.toISOString());

        this.dashboard.approveInvoice(this.invoiceId, { action: "approve" }).subscribe(users => {
          this.toastr.success("payment Approved Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });
          this.isLoadingApprove = false;
          this.createDelivery();
        }, error => {
          console.log('Error :', error);
          this.isLoadingApprove = false;
        });
      }
    });
  }

  createDelivery() {
    const payload = {
      company: this.companyId,
      // current_status: "accepted",
      invoice_no: this.invoiceId,
      // vendor: "EA89454",
      order_no: this.order_number,
      grand_total: this.grand_total,
      address: this.delivery_address
    }

    console.log('data Payload', payload);

    this.delivery.createDelivery(payload).subscribe(delivery => {
      console.log('data :', delivery);
      // console.log('log : ', invoice);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          details: delivery._id
        }
      };
      this.router.navigate(['view/delivery'], navigationExtras)
    }, error => {
      console.log('Error :', error)
    })
  }
  paymentInit() {
    console.log('Payment initialized');
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
      this.createDelivery();
    }, error => {
      console.log('Error : ', error)
    })
  }

  paymentCancel() {
    console.log('payment failed');
  }
  printPage() {
    const logo = document.getElementById('logo').className = "d-block";
    window.print()
  }

}


var date_diff_indays = function (date1, date2) {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}