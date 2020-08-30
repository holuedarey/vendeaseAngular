import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { DeliveryService } from '../../_services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  deliveries:any[] = [];

  userData:any;
  isLoadingDelievery:boolean;
  constructor(private storageService:StorageService, private dleivery:DeliveryService) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
      this.userData = theData;
   }

  ngOnInit(): void {
    this.getDeliveries();
  }

  getDeliveries(){
    this.isLoadingDelievery = true;
    this.dleivery.getAllDeliveries().subscribe(delivery => {
      console.log('invoice data :', delivery.data)
      this.isLoadingDelievery = false;
      this.deliveries = delivery.data.slice().reverse();
    }, error => {
      this.isLoadingDelievery = false;
      console.log('Error :', error)
    })
  }

}
