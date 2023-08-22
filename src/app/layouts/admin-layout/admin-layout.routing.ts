import { Routes } from '@angular/router';


import {HomeComponent} from "../../pages/home/home.component";
import {UsersComponent} from "../../pages/users/users.component";
import {ProcessingcodeComponent} from "../../pages/processing-code/processingcode.component";
import {MessagetypeComponent} from "../../pages/message-type/messagetype.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'home',           component: HomeComponent },
  { path: 'users',           component: UsersComponent },
  { path: 'processing-code',           component: ProcessingcodeComponent },
  { path: 'message-type',           component: MessagetypeComponent }




];
