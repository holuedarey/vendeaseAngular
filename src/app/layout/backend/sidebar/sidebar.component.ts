import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../common/constant';
import { StorageService } from '../../../_service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userData:any;
  avatar:any;
  name:any;
  avatarForm:FormGroup;
  payload:any;
  file:File = null;

  constructor(public storageService:StorageService, private fb:FormBuilder,) {
    const theData = JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.USER));
    this.userData = theData;

    this.avatarForm = this.fb.group({
      avatar: ['', Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
    this.avatar = this.userData.avatar;
    this.name = this.userData.name;
  }


  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log('file : ', this.file);

      const formData = new FormData();
      formData.append('name', 'samuel')
      // this.avatarForm.controls['avatar'].setValue( this.file.name );
      // console.log('form builder : ', this.avatarForm.get('avatar').value);
      
      formData.append('uri', this.avatarForm.get('avatar').value);
      console.log('form : ', formData);
      
    }
  }

}
