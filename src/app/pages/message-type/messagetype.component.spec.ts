import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagetypeComponent } from './messagetype.component';

describe('TablesComponent', () => {
  let component: MessagetypeComponent;
  let fixture: ComponentFixture<MessagetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
