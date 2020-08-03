import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../common/constant';
import { StorageService } from '../../../_service/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userData:any;
  avatar:any;
  name:any;
  constructor(public storageService:StorageService) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
   }

  ngOnInit() {
    this.avatar = this.userData.avatar;
    this.name = this.userData.name;
  }

}
