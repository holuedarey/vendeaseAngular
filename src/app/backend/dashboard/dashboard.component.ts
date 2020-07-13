import { Component, OnInit, ViewChild } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { FormControl } from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective, Color } from 'ng2-charts';

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

  isLoadingBulk:Boolean;
  isLoadingInvoice:Boolean;

  date = new FormControl(new Date());

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4', 'Sales Q5'];
  public pieChartData = [120, 150, 180, 90, 20];
  public pieChartType = 'pie';


  public lineChartData: ChartDataSets[] = [

    {
      data: [1, 40, 70, 90, 95, 70, 40, 10, 0, 0, 0], label: 'Transactions', yAxisID: 'y-axis-0'
    }
  ];
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


  constructor(public dashboard: DasboardService, public storageService: StorageService,) { }

  ngOnInit() {
    this.getInvoice();
    this.getGraphData();
    this.getUser();
    this.getBulkAnalytics();
    this.getAnalytics();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  getUser() {

    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
    this.username = theData.name || "";
    console.log('username : ', this.username)
  }
  async getInvoice() {
    this.isLoadingInvoice = true;
    this.dashboard.invoice().subscribe((invoices) => {
      console.log('invoice data :', invoices.data)
      this.isLoadingInvoice = false;
      return this.invoices = invoices.data
    },error =>{
      this.isLoadingInvoice = false;
      console.log('Error :', error)
    })
  }

  async getGraphData() {
    this.dashboard.getGraph().subscribe((graphData) => {
      console.log('graph data :', graphData)
      return this.graphData = graphData
    }, error =>{

    })
  }

  async getStatData() {
    this.dashboard.getGraph().subscribe((graphData) => {
      console.log('graph data :', graphData)
      return this.graphData = graphData
    }, error =>{

    })
  }

  async getAnalytics() {
    this.dashboard.bulkAnalytics().subscribe((analytic) => {
      this.analytics = analytic;
      console.log('analytics data :', analytic)
      return this.analytics;
    })
  }


  async getBulkAnalytics() {
    const payload =
    {
      action: "bulk-analytics", startDate: "07/15/2019", type: this.userData.type, id: this.userData[this.userData.type.id]
    }
      ;
    this.isLoadingBulk = true;
    this.dashboard.bulkAnalytics(payload).subscribe((analytics) => {
      console.log('bulkanalytics data :', analytics)
      this.invoiceRaised = analytics['invoices'].totalAmount;
      this.invoiceUnpaid = analytics['unpaid_invoices'].totalAmount;
      this.invoicePaid = this.invoiceRaised - this.invoiceUnpaid;
      this.isLoadingBulk = false;
      console.log('paid invoice', this.invoicePaid)
      return this.analyticsBulk = analytics
    }, error => {
      this.isLoadingBulk = false
      console.log('Error : ', error)
    })
  }

}

