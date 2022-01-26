import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqBoxComponent } from './faq-box.component';

describe('FaqBoxComponent', () => {
  let component: FaqBoxComponent;
  let fixture: ComponentFixture<FaqBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
