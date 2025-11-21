import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrationFormComponent } from './entration-form-component';

describe('EntrationFormComponent', () => {
  let component: EntrationFormComponent;
  let fixture: ComponentFixture<EntrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
