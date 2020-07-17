import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../_services/company.service';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  isLoadingCompanyList:boolean;
  userData:any;

  compannies:any[] = [];
  constructor(private companyService:CompanyService, public storageService:StorageService) { 
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;
  }

  ngOnInit(): void {
    this.getCompanyLists()
  }

  getCompanyLists() {
    this.isLoadingCompanyList = true;
    this.companyService.getCompanyList().subscribe(compannies => {
      console.log('business data : ', compannies)
      this.compannies = compannies.data;
      
      this.isLoadingCompanyList = false;
    }, error => {
      console.log('Error :', error);
      this.isLoadingCompanyList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }



  assignAdminFee(user){

  }

  viewCompany(user){
    
  }


}
