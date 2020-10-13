import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../_services/company.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {


  breadCrumb: any = {
    firstLabel: 'User Report',
    secondLabel: 'System Report',
    url: '/report',
    secondLevel: false
  };

  startDate = new Date();
  endDate = new Date();
  isLoadingCompanyList;
  compannies: any[] = [];

  selectDateForm: FormGroup;

  count:any = null;
  exportData:any[] =[];

  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'exportData',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
    }
  };
  constructor(private companyService: CompanyService, private fb: FormBuilder,  private exportAsService: ExportAsService,) {

    this.selectDateForm = this.fb.group({
      start: [this.startDate, ''],
      end: [this.endDate, ''],
      company: ['', Validators.compose([Validators.required])],
    });
  }

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
    });
  }

  
  exportAs(type: SupportedExtensions, opt?: string){
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, `invoice_${new Date().getTime()}`).subscribe(() => {
    });
  }
  generateReport() {
    console.log('form : ', this.selectDateForm.value);
    
    const payload = {
      company: this.selectDateForm.value.company,
      start_date: this.selectDateForm.value.start,
      end_date: this.selectDateForm.value.end,
    }

    console.log('payload : ', payload);
    this.companyService.getCompanyReport(payload).subscribe(report => {
      this.exportData = report.data;
      this.count = report.message;
      console.log('report data : ', this.exportData)

      this.isLoadingCompanyList = false;
    }, error => {
      console.log('Error :', error);
      this.isLoadingCompanyList = false;
    });

    // this.getCompanyLists()
  }
}
