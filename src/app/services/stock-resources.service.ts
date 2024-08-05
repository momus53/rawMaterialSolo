import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface stockresource {
  id: number;
  name: string;
  price: number;
  quantity: {
    value: number;
    unit: string;
  };
  enteredAt: string;
  createdAt: string;
  group: {
    id: number;
    name: string;
  };
  producingFamily: {
    id: number;
    name: string;
    location: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StockResourceService {
  private apiUrl = 'http://localhost:8080/ProyectoLaJustaGrupo5/resources/stockResources'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  /*
  getStockResource(): Observable<stockresource[]> {
    return this.http.get<stockresource[]>(this.apiUrl);
  }
  */
  getStockResource(): Observable<stockresource[]> {
    return this.http.get<stockresource[]>(this.apiUrl).pipe(
      map((resources: stockresource[]) => resources.filter(resource => resource.group.name === 'Insumos'))
    );
  }
  
  addStockResource(product: stockresource): Observable<stockresource> {
    return this.http.post<stockresource>(this.apiUrl, product);
  }

  updateStockResource(product: stockresource): Observable<stockresource> {
    return this.http.put<stockresource>(`${this.apiUrl}`, product);
  }

  deleteStockResource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
