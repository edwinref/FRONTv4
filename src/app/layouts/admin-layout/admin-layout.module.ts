import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from "../../pages/home/home.component";
import {GridAllModule, GridModule} from "@syncfusion/ej2-angular-grids";
import {NumericTextBoxAllModule, RatingAllModule} from "@syncfusion/ej2-angular-inputs";
import {DialogModule} from "@syncfusion/ej2-angular-popups";
import {DatePickerAllModule} from "@syncfusion/ej2-angular-calendars";
import {DropDownListAllModule} from "@syncfusion/ej2-angular-dropdowns";
import {CheckBoxModule} from "@syncfusion/ej2-angular-buttons";
import { BtsService } from 'src/app/pages/home/bts.service';
import {UsersComponent} from "../../pages/users/users.component";
import {ProcessingcodeComponent} from "../../pages/processing-code/processingcode.component";
import {MessagetypeComponent} from "../../pages/message-type/messagetype.component";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    GridModule,
    GridAllModule,
    NumericTextBoxAllModule,
    RatingAllModule ,
    DialogModule,
    DatePickerAllModule,
    DropDownListAllModule,
    ReactiveFormsModule, FormsModule, CheckBoxModule
  ],
  declarations: [

    HomeComponent,
    UsersComponent,
    ProcessingcodeComponent,
    MessagetypeComponent


  ],
  providers: [BtsService, DatePipe],

})

export class AdminLayoutModule {}
