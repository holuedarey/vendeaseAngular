import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../_service/storage.service';
import { Constants } from '../../common/constant';
import { AuthService } from '../../_service/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  userData: any;
  users: any[] = [];
  business: any[] = [];
  submitAttempt: Boolean;
  payloadCreateUser;
  payloadAssignManager;
  signUpForm: FormGroup;

  assignManagerForm: FormGroup;

  isLoadingUserList: boolean;

  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonUser') closebuttonUser;
  constructor(public storageService: StorageService,
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      permissions: ['', Validators.compose([Validators.required])],
    });

    this.assignManagerForm = this.formBuilder.group({
      user: ['', Validators.compose([Validators.required])],
      company: ['', Validators.compose([Validators.required])],
    });


    // this.username = theData.name || "";
  }

  ngOnInit(): void {
    this.getBusinessLists();
    this.getUserLists();
  }


  createUser() {
    this.submitAttempt = true;
    // this.loader.showLoader();
    this.payloadCreateUser = {
      password: this.signUpForm.value.password,
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      phone: this.signUpForm.value.phone,
      permissions: this.signUpForm.value.permissions,

    }
    // console.log('data: ', JSON.stringify(this.payloadCreateUser))

    this.authService.createUser(this.payloadCreateUser).subscribe(user => {
      //hide loader and navigate to dash board Page
      console.log('returnd data : ', user)
      this.closebuttonUser.nativeElement.click();

      this.toastr.success("User created Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.getUserLists();
      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error)
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

  assignManager() {
    this.submitAttempt = true;
    // this.loader.showLoader();
    this.payloadAssignManager = {
      id: this.assignManagerForm.value.user,
      update: this.assignManagerForm.value.company
      // update:{company: this.assignManagerForm.value.company}
    }
    console.log('data payload: ', JSON.stringify(this.payloadAssignManager))

    this.authService.assignManager(this.payloadAssignManager).subscribe(assignManager => {
      //hide loader and navigate to dash board Page
      console.log('returnd data : ', assignManager)

      this.toastr.success("User Updated Successfully", 'Successful', {
        timeOut: 10000,
        closeButton: true
      });
      this.closebutton.nativeElement.click();
    }, error => {
      console.log('Error :', error)
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }


  getUserLists() {
    this.isLoadingUserList = true;
    this.authService.getUserList().subscribe(users => {
      // console.log('returnd data : ', users)
      this.users = users.data;
      //hide loader and navigate to dash board Page

      this.isLoadingUserList = false;
      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error);
      this.isLoadingUserList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

  getBusinessLists() {
    this.isLoadingUserList = true;
    this.authService.getBusinessList().subscribe(business => {
      console.log('business data : ', business)
      this.business = business.data;
      //hide loader and navigate to dash board Page

      this.isLoadingUserList = false;
      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error);
      this.isLoadingUserList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

  showEdit(user) {
    // console.log('user data : ', user)
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
    // this.dialog.open(EditModalComponent, dialogConfig)

    const dialogRef = this.dialog.open(EditModalComponent, dialogConfig);
    const userId = user._id;
    dialogRef.afterClosed().subscribe(
      payloadData => {
        console.log('status : ', payloadData)
        if (payloadData) {
          this.authService.updateUser(userId, payloadData).subscribe(users => {
            this.toastr.success("User Updated Successfully", 'Successful', {
              timeOut: 3000,
              closeButton: true
            });
            console.log('returnd data : ', users)
            this.getUserLists();

            //hide loader and navigate to dash board Page

            // this.isLoadingUserList = false;
            // this.loader.hideLoader();
          }, error => {
            console.log('Error :', error);
            this.isLoadingUserList = false;
            // this.loader.presentToast(error.error.message);
            // this.loader.hideLoader();

          });
        }

      }
    );
  }

  activateUser(userId) {
    this.isLoadingUserList = true;
    const payload = {
      action: "activateUser"
    }

    this.authService.activateDeactivateUser(userId, payload).subscribe(users => {
      this.toastr.success("User Updated Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      console.log('returnd data : ', users)
      this.getUserLists();

      //hide loader and navigate to dash board Page

      this.isLoadingUserList = false;
      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error);
      this.isLoadingUserList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

  deactivateUser(userId) {
    this.isLoadingUserList = true;
    const payload = {
      action: "deactivateUser"
    }
    this.authService.activateDeactivateUser(userId, payload).subscribe(users => {
      this.toastr.success("User Updated Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      //hide loader and navigate to dash board Page

      this.isLoadingUserList = false;
      this.getUserLists();

      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error);
      this.isLoadingUserList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

  activatePaylater(userId) {
    this.isLoadingUserList = true;
    const payload = {
      action: "activatePaylater"
    }
    this.authService.activateDeactivatePaylater(userId, payload).subscribe(users => {
      this.toastr.success("User Updated Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      //hide loader and navigate to dash board Page

      this.isLoadingUserList = false;
      this.getUserLists();

      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error);
      this.isLoadingUserList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

  deactivatePaylater(userId) {
    this.isLoadingUserList = true;
    const payload = {
      action: "deactivatePaylater"
    }
    this.authService.activateDeactivatePaylater(userId, payload).subscribe(users => {
      this.toastr.success("User Updated Successfully", 'Successful', {
        timeOut: 3000,
        closeButton: true
      });
      this.isLoadingUserList = false;
      this.getUserLists();

      // this.loader.hideLoader();
    }, error => {
      console.log('Error :', error);
      this.isLoadingUserList = false;
      // this.loader.presentToast(error.error.message);
      // this.loader.hideLoader();

    });
  }

  deleteUser(userId) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '130px';
    dialogConfig.width = '250px';
    dialogConfig.position = {
      'top': '50px',
    };

    dialogConfig.data = {
      data: JSON.stringify(userId)
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close();
        console.log('Yes clicked');
        this.isLoadingUserList = true;
        this.authService.deleteUser(userId).subscribe(users => {
          // this.getUserLists();
          this.toastr.success("User Deleted Successfully", 'Successful', {
            timeOut: 3000,
            closeButton: true
          });

          this.isLoadingUserList = false;
          this.getUserLists();

          // this.loader.hideLoader();
        }, error => {
          console.log('Error :', error);
          this.isLoadingUserList = false;
          // this.loader.presentToast(error.error.message);
          // this.loader.hideLoader();

        });
      }
    });
  }


}
