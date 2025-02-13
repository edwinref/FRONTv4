import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

    { path: '/home', title: 'Home',  icon:'ni-building text-green', class: '' },
    // { path: '/users', title: 'Users',  icon:'ni-single-02 text-yellow', class: '' },
    //  { path: '/processing-code', title: 'ProcessingCode',  icon:'ni-bullet-list-67 text-red', class: '' },
    //  { path: '/message-type', title: 'MessageType',  icon:'ni-email-83 text-blue', class: '' },
    //   { path: '/login', title: 'Logout',  icon:'ni-key-25 text-info', class: '' }
 

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  private condition: boolean;
  public name: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
    this.getRole();
  }
  isAdmin() {
    if ( sessionStorage.getItem('role') === 'admin') {
      this.condition = true;
    }
  }
  getRole(){
    if ( sessionStorage.getItem('role') === 'admin') {
      this.name = "Administrator";
    }
    else  this.name = "User";
  }
}
