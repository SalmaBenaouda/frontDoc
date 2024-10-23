import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCandidatureComponent } from './details-candidature.component';

describe('DetailsCandidatureComponent', () => {
  let component: DetailsCandidatureComponent;
  let fixture: ComponentFixture<DetailsCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
