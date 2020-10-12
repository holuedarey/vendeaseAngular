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
      const file = (event.target as HTMLInputElement).files[0];
      this.avatarForm.patchValue({ avatar: file });
      this.avatarForm.get('avatar').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = <string>reader.result;
        // convert uploaded file to blob
        const blob = new Blob([new Uint8Array(event.target.result)], { type: file.type });
        console.log('final ', blob);

        formData.append('uri', blob);

      };

      // let formData = new FormData();
      // this.selectedFiles = event.target.files[0];



      // console.log(this.selectedFiles)


      // formData.forEach((value, key) => {
      //   console.log(key + " " + value)
      // });
      // this.selectedFiles = event.target.files[0];
      // const uploadData = new FormData();
      // uploadData.append('first', 'test');

      // uploadData.append('uri', 'samuel');
      // console.log('payload : ', JSON.stringify(uploadData))

      // const payload = {
      //   one:this.selectedFiles,
      //   two :  this.selectedFiles.name
      // }
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
