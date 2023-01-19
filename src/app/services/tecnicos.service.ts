import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  baseUrl: String = environment.baseURL;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Tecnico[]>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  public findById(id: any): Observable<Tecnico> {
    const url2 = `${this.baseUrl}/tecnicos/${id}`;

    return this.http.get<Tecnico>(url2);
  }

  public create(tecnico: Tecnico): Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.post<Tecnico>(url, tecnico);
  }

  public update(tecnico: Tecnico): Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos/" + tecnico.id;
    const url2 = `${this.baseUrl}/tecnicos/${tecnico.id}`;

    return this.http.put<Tecnico>(url, tecnico);
  }

  public delete(tecnico: Tecnico): Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos/" + tecnico.id;
    return this.http.delete<Tecnico>(url);
  }
  
}
