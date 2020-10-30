import { Component, EventEmitter, OnInit } from '@angular/core';
import { Constants } from '../../../common/constant';
import { StorageService } from '../../../_service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DasboardService } from '../../../_services/dasboard.service';
import { Router } from '@angular/router';
import { Endpoint } from '../../../common/endpoints';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userData: any;
  avatar: any;
  name: any;
  avatarForm: FormGroup;
  payload: any;
  file: File = null;

  selectedFiles: File;
  isLoadingUpoad;
  imagePreview;


  // public onFileSelected(event: EventEmitter<File[]>) {
  //   const file: File = event[0];
  //   // this.selectedFiles = file;
  //   this.dashboard.upload(file).subscribe((upload) => {
  //     this.isLoadingUpoad = false;
  //     console.log('upload method:', upload)

  //   }, error => {
  //     this.isLoadingUpoad = false;
  //     console.log('error', error)
  //   })
  //   console.log(file);

  // }

  constructor(public storageService: StorageService, private dashboard: DasboardService, private fb: FormBuilder,private router:Router) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.avatarForm = this.fb.group({
      avatar: [''],
    });

  }


  ngOnInit() {
    this.avatar = this.userData.avatar;
    this.name = this.userData.name;
  }


  
  logOut(){
    this.storageService.clear(Constants.STORAGE_VARIABLES.TOKEN);
    this.storageService.clear(Constants.STORAGE_VARIABLES.USER);
    this.router.navigate(['/login'])
  }

  uploadFile(){
    console.log('got here to ipload');
    
    this.dashboard.upload(this.selectedFiles).subscribe((upload) => {
      this.isLoadingUpoad = false;
      console.log('graph data new:', upload)

    }, error => {
      this.isLoadingUpoad = false;
      console.log('error', error)
    })
  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      let formData = new FormData();
      this.selectedFiles = event.target.files[0];
      // console.log(this.selectedFiles)
      // const file = new Buffer(this.selectedFiles.name).toString('base64');
      // formData.append('uri', file)
    
      // console.log('file base64:', new Buffer(this.selectedFiles.name).toString('base64') );
      
      this.dashboard.upload(this.selectedFiles).subscribe((upload) => {
        this.isLoadingUpoad = false;
        console.log('upload done:', upload)

      }, error => {
        this.isLoadingUpoad = false;
        console.log('error', error)
      })
    }

  }

}
