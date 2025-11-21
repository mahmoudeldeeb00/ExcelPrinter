import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQRComponent } from './show-qrcomponent';

describe('ShowQRComponent', () => {
  let component: ShowQRComponent;
  let fixture: ComponentFixture<ShowQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowQRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
