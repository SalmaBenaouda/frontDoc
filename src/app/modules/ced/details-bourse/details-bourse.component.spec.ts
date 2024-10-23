import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBourseComponent } from './details-bourse.component';

describe('DetailsBourseComponent', () => {
  let component: DetailsBourseComponent;
  let fixture: ComponentFixture<DetailsBourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
