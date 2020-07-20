import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  data:any;
  isLoadingDetail:boolean;
  constructor(private dashboard:DasboardService) {
    
    
   }

  ngOnInit(): void {
    this.data = history.state;
    console.log('data Object : ', history.state._id);
    this.supplierDetails();
  }

  async supplierDetails() {
    var payload = {
    action: "bulk-analytics", 
    type: this.data.type,
    id: this.data[this.data.type].id,
    startDate: parseDate(new Date()), 
    endDate: parseDate(new Date),
    }
    this.isLoadingDetail = true;
    console.log('payload message : ', payload);

    this.dashboard.bulkAnalytics(payload).subscribe((analytics) => {
      this.isLoadingDetail = false;
      console.log('bulkanalytics data :', analytics)
      // this.invoiceRaised = analytics['invoices'].totalAmount || 0;
      // this.invoiceUnpaid = analytics['unpaid_invoices'].totalAmount || 0;
      // this.invoicePaid = this.invoiceRaised - this.invoiceUnpaid;
      // console.log('paid invoice', this.invoicePaid)
      // return this.analyticsBulk = analytics
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }



}

const parseDate = (dateInput) => `${dateInput.getMonth()+1}/${dateInput.getDate() }/${dateInput.getFullYear()}`