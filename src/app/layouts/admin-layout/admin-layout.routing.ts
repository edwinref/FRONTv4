import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {HomeComponent} from "../../pages/home/home.component";
import {UsersComponent} from "../../pages/users/users.component";
import {ProcessingcodeComponent} from "../../pages/processing-code/processingcode.component";
import {MessagetypeComponent} from "../../pages/message-type/messagetype.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
  { path: 'home',           component: HomeComponent },
  { path: 'users',           component: UsersComponent },
  { path: 'processing-code',           component: ProcessingcodeComponent },
  { path: 'message-type',           component: MessagetypeComponent }




];
