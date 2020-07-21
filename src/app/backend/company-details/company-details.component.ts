import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  data:any;
  isLoadingDetail:boolean;
  constructor() { 
    this.data = history.state;
  }

  ngOnInit(): void {
  }

}
