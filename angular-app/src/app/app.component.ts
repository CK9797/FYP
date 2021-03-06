/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, AfterViewInit, OnInit } from '@angular/core';
import $ from 'jquery';
import { NavbarService } from './services/navbar.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'app works!';
  loggedUser = null;
  links: Array<{ text: string, path: string }>;
  Transactionlinks: Array<{ text: string, path: string }>;
  isLoggedIn = false  ;

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private http: HttpClient,
    private cookieService: CookieService) {
    //this.router.config.unshift(
    //  { path: 'login', component: LoginComponent },
   //  );
  }


  ngAfterViewInit() {
    $('.nav a').on('click', function(){
      $('.nav').find('.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    $('.dropdown-menu li').on('click', function(){
      $(this).parent().parent().addClass('active');
    });
    console.log('after view');
  }

  ngOnInit() {
    this.getLoggedUser;
    this.links = this.navbarService.getLinks();
    this.Transactionlinks = this.navbarService.getTransactionLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
    console.log('On Init');
  }
 
  logout() {

    this.cookieService.delete('access_token');
    this.navbarService.updateLoginStatus(false);
    this.loggedUser = null;
    this.router.navigate(['/']);
  }

  getLoggedUser() {
    this.http.get('http://localhost:3000/api/system/ping', { withCredentials: true })
          .subscribe( (res: any ) => {
            this.loggedUser = res.participant;
          }, error => {
            this.loggedUser = null;
          });
  }
}
