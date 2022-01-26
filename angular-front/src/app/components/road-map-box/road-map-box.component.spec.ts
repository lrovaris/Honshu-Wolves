import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapBoxComponent } from './road-map-box.component';

describe('RoadMapBoxComponent', () => {
  let component: RoadMapBoxComponent;
  let fixture: ComponentFixture<RoadMapBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadMapBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadMapBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
