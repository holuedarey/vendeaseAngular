import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../_service/auth.service';

@Component({
  selector: 'app-header-welcome',
  templateUrl: './header-welcome.component.html',
  styleUrls: ['./header-welcome.component.css']
})
export class HeaderWelcomeComponent implements OnInit {

  isLogin: any = false
  constructor(public  authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
      console.log('user Login :', this.isLogin);
    }
  }

  ngOnInit() {
  }

}
