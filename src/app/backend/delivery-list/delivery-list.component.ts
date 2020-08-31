import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { DeliveryService } from '../../_services/delivery.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  deliveries:any[] = [];

  userData:any;
  isLoadingDelievery:boolean;
  constructor(private storageService:StorageService, private dleivery:DeliveryService, private router:Router) {
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

  
  viewDelivery(delivery){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        details: delivery._id
      }
    };
    this.router.navigate(['view/delivery'], navigationExtras)
  }

}
