import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../_service/storage.service';
import { Constants } from '../../../common/constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData:any;
  username:any;
  constructor(public storageService:StorageService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    const theData = JSON.parse( this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
    this.username = theData.name || "";
  }

  logOut(){

  }
}
