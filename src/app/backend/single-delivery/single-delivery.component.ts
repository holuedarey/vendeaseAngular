import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { DeliveryService } from '../../_services/delivery.service';

@Component({
  selector: 'app-single-delivery',
  templateUrl: './single-delivery.component.html',
  styleUrls: ['./single-delivery.component.css']
})
export class SingleDeliveryComponent implements OnInit {

  detail:any;
  deliveryId:any;
  userData:any;
  deliveries:any;
  current_status:any[] = []

  delivered:any;
  confirm:any;
  company_details:any;
  company_confirm:any;
  order_no:any;
  status:any;
  constructor( private route: ActivatedRoute,private storageService:StorageService, private delivery:DeliveryService) { 
    this.route.queryParams.subscribe(params => {
      console.log('params : ', params.details);
      this.detail = params["details"];
      this.deliveryId = this.detail;
      const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
      this.userData = theData;
      // console.log('details : ', this.userData);

    });
  }

  ngOnInit(): void {
    this.getDelievery()
  }

  getDelievery(){
    this.delivery.getDelivery(this.deliveryId).subscribe(delivery =>{
      this.deliveries =  delivery.data;
      this.delivered = delivery.delivered;
      this.confirm = delivery.confirm;
      this.current_status =  delivery.current_status;
      this.company_details = delivery.company_details.name;
      this.company_confirm = delivery.company_confirm;
      this.order_no = delivery.order_no;
      this.status = delivery.status;
      console.log('log data : ', delivery)
    },error =>{
      console.log('Error :', error)
    })
  }
}
