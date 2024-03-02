import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppruebaComponent } from './supprueba.component';

describe('SuppruebaComponent', () => {
  let component: SuppruebaComponent;
  let fixture: ComponentFixture<SuppruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
