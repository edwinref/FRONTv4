import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingcodeComponent } from './processingcode.component';

describe('TablesComponent', () => {
  let component: ProcessingcodeComponent;
  let fixture: ComponentFixture<ProcessingcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
