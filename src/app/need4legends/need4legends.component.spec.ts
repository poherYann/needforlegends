import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Need4legendsComponent } from './need4legends.component';

describe('Need4legendsComponent', () => {
  let component: Need4legendsComponent;
  let fixture: ComponentFixture<Need4legendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Need4legendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Need4legendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
