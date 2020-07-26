import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrls: ['./single-invoice.component.css']
})
export class SingleInvoiceComponent implements OnInit {

  data:any;
  isLoadingDetail:boolean;
  invoice:any;

  constructor(private dashboard:DasboardService) { }

  ngOnInit(): void {
    this.data = history.state;
    // console.log('data Object : ', history.state._id)
  }

  async companyDetails() {
    this.isLoadingDetail = true;

    this.dashboard.getInvoice(this.data._id).subscribe(invoice => {
      this.isLoadingDetail = false;
      console.log('bulkanalytics data :', invoice)
      this.invoice = invoice.data
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }

}
