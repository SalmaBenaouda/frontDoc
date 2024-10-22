import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlanningComponent } from './gestion-planning.component';

describe('GestionPlanningComponent', () => {
  let component: GestionPlanningComponent;
  let fixture: ComponentFixture<GestionPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
