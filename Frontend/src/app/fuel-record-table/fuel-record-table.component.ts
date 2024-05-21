import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

import { FuelRecordService } from '../services/fuel-record.service';

@Component({
  selector: 'app-fuel-record-table',
  templateUrl: './fuel-record-table.component.html',
  styleUrls: ['./fuel-record-table.component.css']
})
export class FuelRecordTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
                                  'usuario', 
                                  'estacion', 
                                  'fecha', 
                                  'litros', 
                                  'pesos', 
                                  'kilometraje', 
                                  'kmsRecorrido', 
                                  'kmsPorLitro'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  searchEstacion: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fuelRecordService: FuelRecordService) {}

  ngOnInit(): void {
    this.loadFuelRecords();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFuelRecords() {
    // Llamada inicial sin parámetros de búsqueda
    this.fuelRecordService.getFuelRecords().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching fuel records:', error);
      }
    );
  }

  searchByEstacion() {
    if (this.searchEstacion.trim() === '') {
      // Si el campo de búsqueda está vacío, cargar todos los registros
      this.loadFuelRecords();
    } else {
      // Si hay un valor en el campo de búsqueda, realizar la búsqueda por estación
      this.fuelRecordService.getFuelRecordsByEstacion(this.searchEstacion).subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Error fetching fuel records by estacion:', error);
        }
      );
    }
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'fecha': return this.compare(a.fecha, b.fecha, isAsc);
        case 'litros': return this.compare(a.litros, b.litros, isAsc);
        case 'pesos': return this.compare(a.pesos, b.pesos, isAsc);
        case 'kilometraje': return this.compare(a.kilometraje, b.kilometraje, isAsc);
        case 'kmsRecorrido': return this.compare(a.kmsRecorrido, b.kmsRecorrido, isAsc);
        case 'kmsPorLitro': return this.compare(a.kmsPorLitro, b.kmsPorLitro, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
