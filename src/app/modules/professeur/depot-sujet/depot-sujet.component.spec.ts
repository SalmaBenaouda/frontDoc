import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotSujetComponent } from './depot-sujet.component';

describe('DepotSujetComponent', () => {
  let component: DepotSujetComponent;
  let fixture: ComponentFixture<DepotSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepotSujetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
