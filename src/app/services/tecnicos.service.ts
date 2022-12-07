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

  constructor(private http: HttpClient,
    private snack: MatSnackBar
    ) { }

  public findAll(): Observable<Tecnico[]>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  public create(tecnico: Tecnico): Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.post<Tecnico>(url, tecnico);
  }

  public generateMessage(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top', 
      duration: 5000
    })
  }
  
}
