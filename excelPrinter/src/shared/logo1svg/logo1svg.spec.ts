import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logo1svg } from './logo1svg';

describe('Logo1svg', () => {
  let component: Logo1svg;
  let fixture: ComponentFixture<Logo1svg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logo1svg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logo1svg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
