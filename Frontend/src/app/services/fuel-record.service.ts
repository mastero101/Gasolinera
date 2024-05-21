import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuelRecordService {
  private apiUrl2 = 'http://localhost:1000/fuelrecords'; // URL de la API
  private apiUrl = 'https://masterodatabase.cloud/fuelrecords';

  constructor() {}

  getFuelRecords(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios.get(this.apiUrl)
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
      axios.get(`${this.apiUrl}/estacion/${estacion}`)
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
      axios.post(this.apiUrl, data)
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
      axios.put(`${this.apiUrl}/${id}`, data)
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

