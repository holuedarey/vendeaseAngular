import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../common/constant';
import { StorageService } from '../../../_service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DasboardService } from '../../../_services/dasboard.service';

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
  constructor(public storageService: StorageService, private dashboard: DasboardService, private fb: FormBuilder,) {
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



  onFileChange(event) {

    if (event.target.files.length > 0) {

    
      let formData = new FormData();
      this.selectedFiles = event.target.files[0];
      // console.log(this.selectedFiles)


      formData.append('uri', this.selectedFiles.name)
      formData.append('test', 'samy')
      
      formData.forEach((value, key) => {
        console.log(key + " " + JSON.stringify(value))
      });

     
      this.dashboard.upload(formData).subscribe((upload) => {
        this.isLoadingUpoad = false;
        console.log('graph data new:', upload)

      }, error => {
        this.isLoadingUpoad = false;
        console.log('error', error)
      })
    }

  }

}
