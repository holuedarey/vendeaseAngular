import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../_service/storage.service';
import { Constants } from '../../../common/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData:any;
  username:any;
  cart:any;
  constructor(public storageService:StorageService, public router:Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    const theData = JSON.parse( this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
    this.username = theData.name || "";
    this.cart = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.CART));
    this.cart = this.cart ? this.cart.length : ""
    
  }

  logOut(){
    this.storageService.clear(Constants.STORAGE_VARIABLES.TOKEN);
    this.storageService.clear(Constants.STORAGE_VARIABLES.USER);
    this.router.navigate(['/login'])
  }
}
