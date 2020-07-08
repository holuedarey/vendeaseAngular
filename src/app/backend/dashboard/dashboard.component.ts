import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../_services/dasboard.service';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  analytics:any[] = [];
  bulkAnalytics:any[] = [];
  invoices:any[] = [];
  graphData:any[] = [];
  username:any;
  userData:any;
  constructor(public dashboard:DasboardService, public storageService: StorageService,) { }

  ngOnInit() {
    this.getInvoice();
    this.getGraphData();
    this.getUser();
    this.getBulkAnalytics();
  }

  getUser(){

    const theData = JSON.parse( this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
    this.username = theData.name || "";
    console.log('username : ', this.username)
  }
  async getInvoice(){
    this.dashboard.invoice().subscribe( (invoices) =>{
      console.log('invoice data :', invoices.data)
      return this.invoices = invoices.data
    })
  }

  async getGraphData(){
    this.dashboard.getGraph().subscribe( (graphData) =>{
      console.log('invoice data :', graphData.data)
      return this.graphData = graphData.data
    })
  }

  async getAnalytics(){
    const payload = {
      startDate : "2020-03-21",
      endDate:"2020-03-21"
    }
    this.dashboard.analytics(payload).subscribe( (analytics) =>{
      console.log('invoice data :', analytics.data)
      return this.analytics = analytics.data
    })
  }

  
  async getBulkAnalytics(){
    const payload = 
      {
        action:"bulk-analytics",startDate:"07/15/2019", type:this.userData.type, id:this.userData[this.userData.type.id]
      }
    ;
    this.dashboard.analytics(payload).subscribe( (analytics) =>{
      console.log('bulkanalytics data :', analytics)
      return this.graphData = analytics.data
    })
  }

}

