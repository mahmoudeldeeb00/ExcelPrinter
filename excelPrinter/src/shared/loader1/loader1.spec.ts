import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loader1 } from './loader1';

describe('Loader1', () => {
  let component: Loader1;
  let fixture: ComponentFixture<Loader1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loader1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loader1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
