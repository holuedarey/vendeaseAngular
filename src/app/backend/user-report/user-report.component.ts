import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompanyService } from '../../_services/company.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  
  breadCrumb: any = {
    firstLabel: 'User Report',
    secondLabel:'System Report',
    url: '/report',
    secondLevel:false
  };
  
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  isLoadingCompanyList;
  compannies:any[] = [];

  constructor(private companyService:CompanyService) { }

  ngOnInit(): void {
    this.getCompanyLists();
  }

  getCompanyLists() {
    this.isLoadingCompanyList = true;
    this.companyService.getCompanyList().subscribe(compannies => {
      this.compannies = compannies.data;
      console.log('business data : ', compannies)

      this.isLoadingCompanyList = false;
    }, error => {
      console.log('Error :', error);
      this.isLoadingCompanyList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }
}
