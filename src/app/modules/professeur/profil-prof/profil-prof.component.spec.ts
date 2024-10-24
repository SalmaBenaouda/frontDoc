import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilProfComponent } from './profil-prof.component';

describe('ProfilProfComponent', () => {
  let component: ProfilProfComponent;
  let fixture: ComponentFixture<ProfilProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
