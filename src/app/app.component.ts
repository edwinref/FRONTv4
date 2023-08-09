import {Component, ElementRef, Inject, Renderer2} from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';

}
