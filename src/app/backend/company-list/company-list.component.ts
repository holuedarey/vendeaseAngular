import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../_services/company.service';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddfeeModalComponent } from './addfee-modal/addfee-modal.component';
import { AuthService } from '../../_service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  isLoadingCompanyList: boolean;
  userData: any;

  compannies: any[] = [];
  skip:any;
  limit:number = 50 ;
  p: number = 1;
  totalItems:any;
  serial:any;
  breadCrumb: any = {
    firstLabel: 'Company List',
    secondLabel:'Company List',
    url: 'company-list',
    secondLevel:false
  };

  searchCompanyForm:FormGroup;

  constructor(private fb:FormBuilder, private companyService: CompanyService, public storageService: StorageService,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.searchCompanyForm = this.fb.group({
      search: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getCompanyLists()
  }

  getCompanyLists() {
    this.isLoadingCompanyList = true;
    this.companyService.getCompanyList({skip:0, limit: this.limit}).subscribe(compannies => {
      console.log('business data : ', compannies)
      this.totalItems = compannies.total;
      this.compannies = compannies.data;
 
      this.isLoadingCompanyList = false;
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      console.log('Error :', error);
      this.isLoadingCompanyList = false;

    });
  }

  pageChanged(event){
    this.skip = (event - 1) * this.limit;
    console.log('offset :', this.skip)
    this.p = event;
    this.companyService.getCompanyList({skip: this.skip, limit: this.limit}).subscribe((compannies) => {
      // console.log('invoice data :', invoices)
      this.isLoadingCompanyList = false;
      this.compannies = compannies.data;
      this.serial = 1 + (this.p  - 1) * this.limit;
      console.log('serial no :', this.serial)
      this.serial = this.serial;
    }, error => {
      this.isLoadingCompanyList = false;
      console.log('Error :', error)
    })
  }

  assignAdminFee(user) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '450px';
    dialogConfig.position = {
      'top': '50px',

    };

    dialogConfig.data = {
      data: JSON.stringify(user)
    };
    // this.dialog.open(AddfeeModalComponent, dialogConfig)

    const dialogRef = this.dialog.open(AddfeeModalComponent, dialogConfig);
    const userId = user._id;
    dialogRef.afterClosed().subscribe(
        payloadData => {
          // console.log('admin fee', payloadData)
          if (payloadData) {
            this.isLoadingCompanyList = true

            this.authService.updateUser(userId, payloadData).subscribe(users => {
              this.toastr.success("User Updated Successfully", 'Successful', {
                timeOut: 3000,
                closeButton: true
              });
              console.log('returnd data : ', users)
              this.getCompanyLists()

              //hide loader and navigate to dash board Page

              // this.isLoadingCompanyList = false;
              // this.loader.hideLoader();
            }, error => {
              console.log('Error :add fee', error);
              this.isLoadingCompanyList = false;


            });
          }

        }
    );
  }



  viewCompany(user) {
    console.log('details : ', user)
    this.router.navigate(['view/company'], { state: user })
  }

  searchCompany(){
    const payload = this.searchCompanyForm.value.search;
    if(payload == undefined) this.getCompanyLists();
    this.authService.searchUser(payload).subscribe(searchUsers => {
      console.log('response :', searchUsers);
      this.compannies = searchUsers.data;
    }, error => {
      console.log('error : ', error);

    })
  }

}
