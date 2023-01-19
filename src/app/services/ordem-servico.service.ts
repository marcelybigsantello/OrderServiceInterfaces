import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdemServico } from '../models/ordem-servico';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  baseUrl: String = environment.baseURL;

  constructor(private http: HttpClient) {
    
  }

  public create(ordemServico: OrdemServico): Observable<OrdemServico>{
    const url = this.baseUrl + "/ordem-servico";
    return this.http.post<OrdemServico>(url, ordemServico);
  }

  public findAll(): Observable<OrdemServico[]> {
    const url = `${this.baseUrl}/ordem-servico/`;
    return this.http.get<OrdemServico[]>(url);
  }

  public findById(id: any): Observable<OrdemServico> {
    const url = `${this.baseUrl}/ordem-servico/${id}`;
    return this.http.get<OrdemServico>(url);
  }

  public update(ordemServico: OrdemServico): Observable<OrdemServico> {
    const url = this.baseUrl + "/ordem-servico/" + ordemServico.id;
    return this.http.put<OrdemServico>(url, ordemServico);
  }

  public delete(ordemServico: OrdemServico): Observable<OrdemServico> {
    const url = this.baseUrl + "/ordem-servico/" + ordemServico.id;
    return this.http.delete<OrdemServico>(url);
  }
  
}
