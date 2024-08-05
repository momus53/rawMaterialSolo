import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface stockrawmaterial {
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
    name: string;
  };
  producingFamily: {
    name: string;
    location: string;
  };
  canFreeze: boolean;
  prepared: boolean;
  expiredAt: string;
  action?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StockRawMaterialService {
  private apiUrl = 'http://localhost:8080/ProyectoLaJustaGrupo5/resources/stockRawMaterials'; 
  constructor(private http: HttpClient) { }

  getRawMaterial(): Observable<stockrawmaterial[]> {
    return this.http.get<stockrawmaterial[]>(this.apiUrl);
  }
  
  addRawMaterial(product: stockrawmaterial): Observable<stockrawmaterial> {
    return this.http.post<stockrawmaterial>(this.apiUrl, product);
  }

  updateRawMaterial(product: stockrawmaterial): Observable<stockrawmaterial> {
    return this.http.put<stockrawmaterial>(`${this.apiUrl}`, product);
  }

  deleteRawMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
