import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCedComponent } from './dash-ced.component';

describe('DashCedComponent', () => {
  let component: DashCedComponent;
  let fixture: ComponentFixture<DashCedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashCedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
