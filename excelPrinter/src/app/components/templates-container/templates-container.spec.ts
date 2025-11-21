import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesContainer } from './templates-container';

describe('TemplatesContainer', () => {
  let component: TemplatesContainer;
  let fixture: ComponentFixture<TemplatesContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
