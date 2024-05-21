import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelRecordService } from '../services/fuel-record.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-fuel-record-edit',
  templateUrl: './fuel-record-edit.component.html',
  styleUrls: ['./fuel-record-edit.component.scss']
})
export class FuelRecordEditComponent implements OnInit {
  fuelRecords: any[] = [];
  selectedRecord: any;
  editForm: FormGroup;
  searchEstacion: string = '';

  constructor(private fuelRecordService: FuelRecordService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.editForm = this.formBuilder.group({
      selectedRecord: [null],
      searchTerm: [''],
      estacion: ['', Validators.required],
      fecha: ['', Validators.required],
      litros: ['', Validators.required],
      pesos: ['', Validators.required],
      kilometraje: ['', Validators.required],
      kmsRecorrido: ['', Validators.required],
      kmsPorLitro: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFuelRecords();

    this.editForm.get('searchTerm')?.valueChanges
      .subscribe((searchTerm: string) => {
        if (searchTerm) {
          this.fuelRecordService.getFuelRecordsByEstacion(searchTerm)
            .subscribe((data) => {
              this.fuelRecords = data;
            });
        } else {
          this.loadFuelRecords();
        }
      });
  }

  loadFuelRecords(): void {
    this.fuelRecordService.getFuelRecords()
      .subscribe((data) => {
        this.fuelRecords = data;
      });
  }

  searchByEstacion(): void {
    if (this.searchEstacion.trim() === '') {
      this.loadFuelRecords();
    } else {
      this.fuelRecordService.getFuelRecordsByEstacion(this.searchEstacion)
        .subscribe((data) => {
          this.fuelRecords = data;
          if (this.fuelRecords.length > 0) {
            this.selectRecord(this.fuelRecords[0]);
          }
        });
      console.log(this.fuelRecords)
    }
  }

  selectRecord(record: any): void {
    this.selectedRecord = record;
  
    this.editForm.patchValue({
      estacion: record.estacion,
      fecha: record.fecha,
      litros: record.litros,
      pesos: record.pesos,
      kilometraje: record.kilometraje,
      kmsRecorrido: record.kmsRecorrido,
      kmsPorLitro: record.kmsPorLitro
    });
  }

  updateRecord(): void {
    if (this.selectedRecord) {
      this.fuelRecordService.updateFuelRecord(this.selectedRecord.id, this.editForm.value)
        .subscribe(
          (response) => {
            // Actualización exitosa
            console.log('Registro actualizado correctamente:', response);
            setTimeout(() => {
              this.snackBar.open('Registro actualizado correctamente', 'Cerrar', {
                duration: 5000, 
              });
            });
            this.editForm.reset();
          },
          (error) => {
            // Error en la actualización
            console.error('Error al actualizar el registro:', error);
            setTimeout(() => {
              this.snackBar.open('Error al actualizar el registro', 'Cerrar', {
                duration: 5000,
              });
            });
          }
        );
    }
  }
}

