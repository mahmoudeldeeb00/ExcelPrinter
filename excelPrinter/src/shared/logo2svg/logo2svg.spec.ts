import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logo2svg } from './logo2svg';

describe('Logo2svg', () => {
  let component: Logo2svg;
  let fixture: ComponentFixture<Logo2svg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logo2svg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logo2svg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
