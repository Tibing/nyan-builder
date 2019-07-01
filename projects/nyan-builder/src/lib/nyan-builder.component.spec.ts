import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NyanBuilderComponent } from './nyan-builder.component';

describe('NyanBuilderComponent', () => {
  let component: NyanBuilderComponent;
  let fixture: ComponentFixture<NyanBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NyanBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NyanBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
