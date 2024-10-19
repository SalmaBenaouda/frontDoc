import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatComponentComponent } from './candidat-component.component';

describe('CandidatComponentComponent', () => {
  let component: CandidatComponentComponent;
  let fixture: ComponentFixture<CandidatComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
