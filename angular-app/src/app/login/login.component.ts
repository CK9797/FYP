import { Component, Inject, OnInit } from '@angular/core';
import { NavbarService } from "../services/navbar.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  role = '';

  constructor(private navbarService: NavbarService) {
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit() {
  }

  loginStaff(){
    this.navbarService.updateNavAfterAuth('Staff');
    this.navbarService.updateLoginStatus(true);
    this.role = 'Staff';
    
  }

  loginCust(){
    this.navbarService.updateNavAfterAuth('Customer');
    this.navbarService.updateLoginStatus(true);
    this.role = 'Customer';
  }

}
