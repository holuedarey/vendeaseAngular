import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';
import { ActivatedRoute } from '@angular/router';

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

  company_details_name:any;
  items:any[] = [];

  others:any[] = [];
  createdAt:any;
  sub_total;
  grand_total;

  deafaultDate: any = new Date().toISOString();
  detail:any;

  constructor(private dashboard: DasboardService, private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];
      console.log('details : ', this.detail)
    });
  }

  ngOnInit(): void {
    this.invoiceDetails();
  }

  async invoiceDetails() {
    this.isLoadingDetail = true;

    this.dashboard.getInvoice(this.detail).subscribe(invoice => {
      this.isLoadingDetail = false;
      console.log('invoice single data :', invoice)
      this.invoice = invoice.data;
      this.invoiceNumber = invoice.invoice_number;
      this.order_number = invoice.order_number;
      this.paid = invoice.paid;
      this.payment_date = invoice.payment_date;
      this.overDue = date_diff_indays(this.deafaultDate, this.payment_date);
      this.company_details_name = invoice.company_details.name || null;
      this.items = invoice.items || [];
      this.others = invoice.other || [];
      this.createdAt = invoice.createdAt;
      this.sub_total = invoice.sub_total || 0;
      this.grand_total = invoice.grand_total || 0;
      console.log('total :', this.grand_total )
    }, error => { 
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }

}


var date_diff_indays = function(date1, date2) {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}