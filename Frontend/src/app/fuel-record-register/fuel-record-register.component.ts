import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelRecordService } from '../services/fuel-record.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fuel-record-register',
  templateUrl: './fuel-record-register.component.html',
  styleUrls: ['./fuel-record-register.component.scss']
})
export class FuelRecordRegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fuelRecordService: FuelRecordService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      estacion: ['', Validators.required],
      fecha: ['', Validators.required],
      litros: ['', Validators.required],
      pesos: ['', Validators.required],
      kilometraje: ['', Validators.required],
      kmsRecorrido: ['', Validators.required],
      kmsPorLitro: ['', Validators.required]
    });
  }

  Registrar() {
    if (this.registrationForm.valid) {
      this.fuelRecordService.addFuelRecord(this.registrationForm.value)
        .subscribe(
          (response) => {
            console.log('Registro exitoso:', response);
            this.registrationForm.reset();
            this.Snackbar('Registro exitoso');
          },
          (error) => {
            console.error('Error al registrar el combustible:', error);
            this.Snackbar('Error al registrar el combustible');
          }
        );
    }
  }

  Snackbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
    });
  }
}