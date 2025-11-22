import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Progressdownladpdf } from './progressdownladpdf';

describe('Progressdownladpdf', () => {
  let component: Progressdownladpdf;
  let fixture: ComponentFixture<Progressdownladpdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Progressdownladpdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Progressdownladpdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
