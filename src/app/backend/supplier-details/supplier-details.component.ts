import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  data: any;
  isLoadingDetail: boolean;
  receiptsAmount: any;
  receiptsCount: any;

  invoiceUnpaidAmount;
  invoiceUnpaidCount;

  deliveryAmount: any;
  deliveryCount: any;

  theUsers:any[] = []
  breadCrumb: any = {
    firstLabel: 'Supplier List',
    secondLabel: '',
    url: '/supplier-list',
    secondLevel: true
  };

  constructor(private dashboard: DasboardService) {


  }

  ngOnInit(): void {
    this.data = history.state;
    console.log('data Object : ', history.state._id);
    this.supplierDetails();
    this.breadCrumb.secondLabel = `Supplier #${this.data[this.data.type].id}`;
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
      this.receiptsAmount = analytics['receipts'].totalAmount || 0;
      this.receiptsCount = analytics['receipts'].count || 0;

      this.invoiceUnpaidAmount = analytics['unpaid_invoices'].totalAmount || 0;
      this.invoiceUnpaidCount = analytics['unpaid_invoices'].count || 0;

      this.deliveryAmount =  analytics['delivery'].totalAmount || 0;
      this.deliveryCount =  analytics['delivery'].count || 0;

      //get the users data
      this.theUsers = analytics.users;
      // return this.analyticsBulk = analytics
    }, error => {
      this.isLoadingDetail = false
      console.log('Error : ', error)
    })
  }



}

const parseDate = (dateInput) => `${dateInput.getMonth() + 1}/${dateInput.getDate()}/${dateInput.getFullYear()}`
