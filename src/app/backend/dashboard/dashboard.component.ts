import { Component, OnInit, ViewChild } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { FormControl } from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective, Color } from 'ng2-charts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  analytics: any[] = [];
  bulkAnalytics: any[] = [];
  invoices: any[] = [];
  graphData: any[] = [];
  username: any;
  userData: any;
  analyticsBulk: any[] = [];

  invoiceRaised: any;
  invoicePaid: any;
  invoiceUnpaid: any;

  color = 'primary';
  mode = 'determinate';
  value = 50;

  isLoadingBulk: Boolean;
  isLoadingInvoice: Boolean;

  isLoadingGraph: boolean;

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  public pieChartLabels = [];
  public pieChartData = [100, 20, 35, 100, 24];

  public pieChartDataCompany = [100, 20, 35, 100, 24];
  public pieChartLabelsCompany = [];

  public pieChartDataCompany2 = [100, 20, 35, 100, 24];
  public pieChartLabelsCompany2 = [];
  
  
  public pieChartLabels2 = [];
  public pieChartData2 = [100, 20, 35, 100, 24];
  public pieChartType = 'pie';

  //analytic variable
  month: any;
  day: any;
  last7Days: any;
  isLoadingAnalytic: boolean;

  public lineChartData: ChartDataSets[] = [];
  public lineChartData2: ChartDataSets[] = [];
  public lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [

        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: '',
          },
          ticks: {
            fontColor: 'blue',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'blue',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'black',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },];

  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  constructor(public dashboard: DasboardService, public storageService: StorageService,private router:Router) {
   
  }

  ngOnInit() {
    this.getInvoice();
    // this.getGraphData();
    this.getUser();
    this.getBulkAnalytics();
    this.getAnalytics();
    this.loadGraph();
    this.getTopFiveCompany();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  loadGraph() {
    if (this.userData.type == 'company') {
      this.getTopFive();
    } else if (this.userData.type == 'vendor') {
      this.getGraphData();
    } else if (this.userData.type == 'system') {
      this.getTopFiveCompany();
    }
  }
  getUser() {

    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
    this.username = theData.name || "";
    // console.log('username : ', this.username)
  }
  async getInvoice() {
    this.isLoadingInvoice = true;
    this.dashboard.invoice().subscribe((invoices) => {
      // console.log('invoice data :', invoices.data)
      this.isLoadingInvoice = false;
      return this.invoices = invoices.data
    }, error => {
      this.isLoadingInvoice = false;
      console.log('Error :', error)
    })
  }

  getSingleInvoice(invoice){
    console.log('log : ', invoice);
    this.router.navigate(['view/invoice'], { state: invoice })
  }

  async getGraphData() {
    this.isLoadingGraph = true;
    this.dashboard.getGraph().subscribe((graphData) => {
      this.isLoadingGraph = false;
      // console.log('graph data :', graphData)
      const lineChartData = graphData.invoices.map(item => item.totalAmount)
      const lineChartData2 = graphData.paid_invoices.map(item => item.totalAmount)
      this.lineChartData = [
        { data: lineChartData, label: 'Invoices', yAxisID: 'y-axis-0' },
        // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
        // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: lineChartData2, label: 'Receipts' },
        // {data:lineChartData2, label: 'Receipts', yAxisID: 'y-axis-0' },
      ]
      // console.log('line chart :', lineChartData2)
      return this.graphData = graphData
    }, error => {
      this.isLoadingGraph = false;
      console.log('error', error)
    })
  }

  async getAnalytics() {
    const payload = {
      type: "invoice", startDate: this.startDate.value, endDate: this.endDate.value
    }

    // console.log('payload :', payload)
    this.isLoadingAnalytic = true;
    this.dashboard.bulkAnalytics(payload).subscribe((analytic) => {
      this.isLoadingAnalytic = false;
      this.day = analytic['24_hours'].totalAmount;
      this.month = analytic['1_month'].totalAmount;
      this.last7Days = analytic['7_days'].totalAmount;
      // console.log('analytics data :', analytic)
      return this.analytics;
    }, error => {
      this.isLoadingAnalytic = false
      console.log('Error : ', error)
    })
  }


  async getBulkAnalytics() {
    var payload = {};
    if (this.userData.type == 'system') {
      // console.log(' igot here');
      payload = {
        action: "bulk-analytics", startDate: parseDate(this.startDate.value), endDate: parseDate(this.endDate.value),
      };
    } else if (this.userData.type != 'system') {
      payload =
      {
        action: "bulk-analytics", startDate: parseDate(this.startDate.value), endDate: parseDate(this.endDate.value), type: this.userData.type, id: this.userData[`${this.userData.type}`].id
      };
    }

    this.isLoadingBulk = true;
    // console.log('payload message day 7days and others: ', payload);
    // {action:"bulk-analytics",type:"company",id:"JE158175"}
    this.dashboard.bulkAnalytics(payload).subscribe(analytics => {
      this.isLoadingBulk = false;

      console.log('bulkanalytics data :', analytics)
      this.invoiceRaised = analytics['invoices'].totalAmount || 0;
      this.invoiceUnpaid = analytics['unpaid_invoices'].totalAmount || 0;
      this.invoicePaid = this.invoiceRaised - this.invoiceUnpaid;
      // console.log('paid invoice', this.invoicePaid)
      // return this.analyticsBulk = analytics
    }, error => {
      this.isLoadingBulk = false
      console.log('Error : ', error)
    })
  }


  async getTopFive() {
    const payload = {
      action: "top_products", id: this.userData[this.userData.type].id, type: this.userData.type
    };
    this.isLoadingBulk = true;
      console.log('payload message product: ', payload);
      // console.log('sample : ', { action: "top_products", type: "company", id: "JE158175" });

    this.dashboard.bulkAnalytics(payload).subscribe(topFive => {
      this.isLoadingBulk = false;

      console.log('product data :', topFive)
      this.pieChartLabels = topFive.amount_purchased.map(item => item.name)
      this.pieChartData = topFive.amount_purchased.map(item => item.amount)

      this.pieChartLabels2 = topFive.volume_purchased.map(item => item.name)
      this.pieChartData2 = topFive.volume_purchased.map(item => item.quantity)

      // console.log('getTopFive label 1:', this.pieChartData)
      // console.log('getTopFive label 2:', this.pieChartData2)
    }, error => {
      this.isLoadingBulk = false
      console.log('Error : ', error)
    })
  }


  async getTopFiveCompany() {
    const payload = {
      action: "top_companies"
    };
    this.isLoadingBulk = true;
    console.log('payload message company: ', payload);

    this.dashboard.bulkAnalytics(payload).subscribe(topFive => {
      // this.isLoadingBulk = false;

      console.log('getTopFive data company :', topFive)
      this.pieChartLabelsCompany = topFive.top_ranked.map(item => item.company_name)
      this.pieChartDataCompany = topFive.top_ranked.map(item => item.amount)

      this.pieChartLabelsCompany2 = topFive.top_ranked.map(item => item.company_name)
      this.pieChartDataCompany2 = topFive.top_ranked.map(item => item.amount)
    }, error => {
      // this.isLoadingBulk = false
      console.log('Error : ', error)
    })
  }
}

const parseDate = (dateInput) => `${dateInput.getMonth() + 1}-${dateInput.getDate()}-${dateInput.getFullYear()}`
