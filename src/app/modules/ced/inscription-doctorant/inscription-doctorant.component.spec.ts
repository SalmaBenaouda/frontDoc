import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDoctorantComponent } from './inscription-doctorant.component';

describe('InscriptionDoctorantComponent', () => {
  let component: InscriptionDoctorantComponent;
  let fixture: ComponentFixture<InscriptionDoctorantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionDoctorantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionDoctorantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
