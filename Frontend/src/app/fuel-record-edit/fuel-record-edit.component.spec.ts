import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelRecordEditComponent } from './fuel-record-edit.component';

describe('FuelRecordEditComponent', () => {
  let component: FuelRecordEditComponent;
  let fixture: ComponentFixture<FuelRecordEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelRecordEditComponent]
    });
    fixture = TestBed.createComponent(FuelRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
