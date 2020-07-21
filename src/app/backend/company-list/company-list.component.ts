import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../_services/company.service';
import { Constants } from '../../common/constant';
import { StorageService } from '../../_service/storage.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddfeeModalComponent } from './addfee-modal/addfee-modal.component';
import { AuthService } from '../../_service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  isLoadingCompanyList: boolean;
  userData: any;



  compannies: any[] = [];
  constructor(private companyService: CompanyService, public storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog) {
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

  assignAdminFee(user) {
    console.log('user data : ', user)
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
        this.isLoadingCompanyList = true
        console.log('admin fee', payloadData)
        if (payloadData) {
          this.authService.updateUser(userId, payloadData).subscribe(users => {
            this.toastr.success("User Updated Successfully", 'Successful', {
              timeOut: 3000,
              closeButton: true
            });
            console.log('returnd data : ', users)
            this.getCompanyLists()

            //hide loader and navigate to dash board Page

            this.isLoadingCompanyList = false;
            // this.loader.hideLoader();
          }, error => {
            console.log('Error :', error);
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


}
