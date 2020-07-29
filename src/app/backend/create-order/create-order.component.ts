import { Component, OnInit } from '@angular/core';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  userData:any;
  products:any[] = [];
  constructor(private storageService:StorageService) { 
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
  }

  ngOnInit(): void {
  }

}
