import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendermodalComponent } from './rendermodal.component';

describe('RendermodalComponent', () => {
  let component: RendermodalComponent;
  let fixture: ComponentFixture<RendermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendermodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
