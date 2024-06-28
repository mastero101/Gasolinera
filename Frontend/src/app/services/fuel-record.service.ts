import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelRecordService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getFuelRecords(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios.get(`${this.apiUrl}/fuelrecords`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getFuelRecordsByEstacion(estacion: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios.get(`${this.apiUrl}/fuelrecords/estacion/${estacion}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  addFuelRecord(data: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios.post(`${this.apiUrl}/fuelrecords`, data)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  updateFuelRecord(id: number, data: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios.put(`${this.apiUrl}/fuelrecords/${id}`, data)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}

