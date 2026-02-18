import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfissionalResponseModel, ProfissionalCriarRequestModel, ProfissionalEditarRequestModel, ProfissionalPesquisaResponseModel } from '../models/profissional.model';

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<ProfissionalResponseModel[]> {
    const url = `${environment.apiUrl}/profissionais`;
    return this.httpClient.get<ProfissionalResponseModel[]>(url);
  }

  create(form: ProfissionalCriarRequestModel): Observable<ProfissionalResponseModel> {
    const url = `${environment.apiUrl}/profissionais`;
    return this.httpClient.post<ProfissionalResponseModel>(url, form);
  }

  update(id: string, form: ProfissionalEditarRequestModel): Observable<ProfissionalResponseModel> {
    const url = `${environment.apiUrl}/profissionais/${id}`;
    return this.httpClient.put<ProfissionalResponseModel>(url, form);
  }

  getById(id: string): Observable<ProfissionalPesquisaResponseModel> {
    const url = `${environment.apiUrl}/profissionais/${id}`;
    return this.httpClient.get<ProfissionalPesquisaResponseModel>(url);
  }

  inativar(id: string): Observable<void> {
    const url = `${environment.apiUrl}/profissionais/${id}`;
    return this.httpClient.delete<void>(url);
  }

  ativar(id: string): Observable<void> {
    const url = `${environment.apiUrl}/profissionais/${id}/ativar`;
    return this.httpClient.put<void>(url, {});
  }
}
