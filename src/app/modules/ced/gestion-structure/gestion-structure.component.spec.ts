import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStructureComponent } from './gestion-structure.component';

describe('GestionStructureComponent', () => {
  let component: GestionStructureComponent;
  let fixture: ComponentFixture<GestionStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
