import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPreselectionComponent } from './planning-preselection.component';

describe('PlanningPreselectionComponent', () => {
  let component: PlanningPreselectionComponent;
  let fixture: ComponentFixture<PlanningPreselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningPreselectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningPreselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
