import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cliente } from "../models/cliente";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    baseUrl: String = environment.baseURL;

    constructor(private http: HttpClient,
        private snack: MatSnackBar){

    }

    public create(cliente: Cliente): Observable<Cliente> {
        const url = this.baseUrl + "/clientes";
        return this.http.post<Cliente>(url, cliente);
    }

    public findAll(): Observable<Cliente[]> {
        const url = this.baseUrl + "/clientes";
        return this.http.get<Cliente[]>(url);
    }

    public findById(id: any): Observable<Cliente> {
        const url = `${this.baseUrl}/clientes/${id}`;
        return this.http.get<Cliente>(url);
    }

    public update(cliente: Cliente): Observable<Cliente> {
        const url = `${this.baseUrl}/clientes/${cliente.id}`;
        return this.http.put<Cliente>(url, cliente);
    }

    public delete(cliente: Cliente): Observable<Cliente> {
        const url = `${this.baseUrl}/clientes/${cliente.id}`;
        return this.http.delete<Cliente>(url);
    }
    
}