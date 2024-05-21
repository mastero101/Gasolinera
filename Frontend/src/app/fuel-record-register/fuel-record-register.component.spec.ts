import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelRecordRegisterComponent } from './fuel-record-register.component';

describe('FuelRecordRegisterComponent', () => {
  let component: FuelRecordRegisterComponent;
  let fixture: ComponentFixture<FuelRecordRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelRecordRegisterComponent]
    });
    fixture = TestBed.createComponent(FuelRecordRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
