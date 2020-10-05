import { Component, OnInit, ViewChild } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, BaseChartDirective, Color } from 'ng2-charts';
import { Router } from '@angular/router';
import { OrdersService } from '../../_services/orders.service';


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

  //fusion chart loader
  isLoadingFusion:boolean;

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
  public pieChartType = 'doughnut';

  //analytic variable
  month: any;
  day: any;
  last7Days: any;
  isLoadingAnalytic: boolean;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 60, 61, 67, 65, 69, 50, 62], label: 'Series A' },
    { data: [70, 78, 74, 69, 86, 76, 84, 78, 93], label: 'Series B' },
    { data: [47, 67, 57, 50, 60, 59, 56, 60, 70], label: 'Series C', },
    { data: [57, 69, 78, 58, 68, 69, 70, 74, 90], label: 'Series D' },
    { data: [52, 58, 52, 60, 63, 65, 68, 64, 69], label: 'Series E' },

  ];
  public lineChartData2: ChartDataSets[] = [];
  public lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    legend: {
      fullWidth:true,
      labels: { fontColor: 'red' },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: { fontColor: 'black' },
          gridLines: { color: 'rgba(225,255,255,0.9)' }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: { fontColor: 'black' },
          gridLines: { color: 'rgba(225,225,225,0.2)' }
        },
        
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 1,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: '#FF9800',
      // pointHoverBackgroundColor: '#FF9800',
      // pointHoverBorderColor: '#FF9800'
    }, { // grey
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: '#EB4444',
      // pointHoverBackgroundColor: '#EB4444',
      // pointHoverBorderColor: '#EB4444'
    },
    { // grey
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: '#0033CC',
      // pointHoverBackgroundColor: '#0033CC',
      // pointHoverBorderColor: '#0033CC'
    },
    { // grey
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: 'rgb(73,191,167)',
      // pointHoverBackgroundColor: 'rgb(73,191,167)',
      
      // pointHoverBorderColor: 'rgb(73,191,167)'
    },
    { // grey
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: '#919191',
      // pointHoverBackgroundColor: '#919191',
      // pointHoverBorderColor: '#919191'
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';

  sortRanges: any[] = ['weeekly', 'monthly', 'yearly'];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  dataSource: Object;
  sortRangesForm: FormGroup;

  showOne:boolean = false;
  showTwo:boolean = true;
  showThree:boolean = false;
  isLoadingOrder:boolean;

  orders:any[] = [];
  p: number = 1;

  skip:any;
  limit:any;
  totalItems:any;

  constructor(public dashboard: DasboardService, public storageService: StorageService, private router: Router, private fb:FormBuilder, private order:OrdersService) {
    this.sortRangesForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      range: [this.sortRanges[1], ''],
    });
  }

  ngOnInit() {
    // this.getInvoice();
    this.getOrders();
    this.getGraphData();
    this.getUser();
    this.getBulkAnalytics();
    this.getAnalytics();
    this.loadGraph();
    // this.getTopFiveCompany();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  loadGraph() {
    this.getTopFiveProduct();
    if (this.userData.type == 'company') {
      // this.getTopFiveProduct();
    } else if (this.userData.type == 'vendor') {
      // this.getGraphData();
    } else if (this.userData.type == 'system') {
      // this.getTopFiveCompany();
    }
  }
  getUser() {

    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
    this.username = theData.name || "";
    // console.log('username : ', this.username)
  }
  
  getOrders() {
    this.isLoadingOrder = true;
    this.limit = 50;
    this.skip = 0;
    this.order.getOrders({skip:this.skip, limit: this.limit}).subscribe(orders => {
      console.log('orders data :', orders.data)
      this.totalItems = orders.total;
      this.isLoadingOrder = false;
      this.orders = orders.data.slice().reverse();
    }, error => {
      this.isLoadingOrder = false;
      console.log('Error :', error)
    })
  }

  
  pageChanged(event){
    this.skip = (event - 1) * this.limit;
    console.log('offset :', this.skip)
    this.order.getOrders({skip:this.skip, limit: this.limit}).subscribe(orders => {
      console.log('orders data :', orders.data)
      this.totalItems = orders.total;
      this.isLoadingOrder = false;
      this.orders = orders.data.slice().reverse();
    }, error => {
      this.isLoadingOrder = false;
      console.log('Error :', error)
    })
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

  getSingleInvoice(invoice) {
    console.log('log : ', invoice);
    this.router.navigate(['view/invoice'], { state: invoice })
  }

  async getGraphData() {
    this.isLoadingGraph = true;
    this.dashboard.getGraph().subscribe((graphData) => {
      this.isLoadingGraph = false;
      // console.log('graph data ooo:', graphData)
      const lineChartData = graphData.invoices.map(item => item.totalAmount)
      const lineChartData2 = graphData.paid_invoices.map(item => item.totalAmount)
      // this.lineChartData = [
      // { data: lineChartData, label: 'Invoices', yAxisID: 'y-axis-0' },
      // { data: lineChartData2, label: 'Receipts' },
      // {data:lineChartData2, label: 'Receipts', yAxisID: 'y-axis-0' },
      // ]
      console.log('line chart :', lineChartData2)
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


  async getTopFiveProduct() {
    const payload = {
      action: "top_products", id: this.userData[this.userData.type].id, type: this.userData.type
    };
    this.isLoadingBulk = true;
    this.isLoadingFusion = true;
    // console.log('payload message product: ', payload);
    // console.log('sample : ', { action: "top_products", type: "company", id: "JE158175" });

    this.dashboard.bulkAnalytics(payload).subscribe(topFive => {
      this.isLoadingBulk = false;
      this.isLoadingFusion = false;
      console.log('top product data :', topFive)
      this.pieChartLabels = topFive.amount_purchased.map(item => item.name)
      this.pieChartData = topFive.amount_purchased.map(item => item.amount)

      this.pieChartLabels2 = topFive.volume_purchased.map(item => item.name)
      this.pieChartData2 = topFive.volume_purchased.map(item => item.quantity)

      // const lineChartData = topFive.amount_purchased.map(item => item.amount)
      // console.log('data : ', lineChartData)

      // const lineChartData2 = topFive.amount_purchased.map(item => item.amount)
      const chartData = topFive.volume_purchased.map(item => { 
          return {  label : item.name.substring(0, 5), value : item.quantity}
      });

      // STEP 3 - Chart Configuration
      const dataSource = {
        chart: {
          showLegend:false,
          "baseFont": "roboto",
          "baseFontSize": "10",
          "baseFontColor": "#0066cc",
          width: "100%", //width of the chart
          height: "100%", //height of the chart
          //Set the theme for your chart
          theme: "fusion"
        },
        // Chart Data - from step 2
        data: chartData
      };
      this.dataSource = dataSource;

    }, error => {
      this.isLoadingBulk = false;
      this.isLoadingFusion = false;
      console.log('Error : ', error)
    })
  }

  today(){
   this.showOne = true; 
   this.showTwo = false;
   this.showThree =false
  }
  sevenDays(){
    this.showOne = false; 
   this.showTwo = true;
   this.showThree =false
  }
  thisMonth(){
    this.showOne = false; 
    this.showTwo = false;
    this.showThree =true
  }
  async getTopFiveCompany() {
    const payload = {
      action: "top_companies"
    };
    this.isLoadingBulk = true;
    // console.log('payload message company: ', payload);

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
