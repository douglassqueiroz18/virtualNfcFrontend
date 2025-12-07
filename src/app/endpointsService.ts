import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PageData } from './services/pagePrototipo.service';

@Injectable({ providedIn: 'root' })
export class endPointService {

  private baseUrl = 'http://localhost:8080/api/pages';
  private baseUrlGetAllCards = 'http://localhost:8080/api/pages/all';
  private baseUrlDeleteCard = 'http://localhost:8080/api/pages/delete';
  private baseUrlCreatePage = 'http://localhost:8080/api/pages/create';
  private baseUrlGetPageById = 'http://localhost:8080/api/pages/get';
  constructor(private http: HttpClient) {}

  createPagePrototipo(dto: any): Observable<number> {
    return this.http.post<number>(`${this.baseUrlCreatePage}`, dto);
  }

  getAllCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlGetAllCards}`);
  }

getPageByIdPrototipo(id: number): Observable<PageData> {
  return this.http.get<any>(`${this.baseUrlGetPageById}/${id}`).pipe(
    map(page => {

      // Se o backend NÃO enviou payload, monta usando os campos soltos
      if (!page.payload) {
        return {
          ...page,
          payload: {
            nomeCartao: page.nomeCartao ?? '',
            instagram: page.instagram ?? '',
            whatsapp: page.whatsapp ?? '',
            facebook: page.facebook ?? '',
            linkedin: page.linkedin ?? '',
            youtube: page.youtube ?? '',
            site: page.site ?? ''
          }
        };
      }

      // Caso payload exista, tenta fazer parse (caso seja string)
      let payloadObj = page.payload;

      if (typeof page.payload === 'string') {
        try {
          payloadObj = JSON.parse(page.payload || '{}');
        } catch {
          payloadObj = {};
        }
      }

      return {
        ...page,
        payload: payloadObj
      };
    })
  );
}


  deleteCardPrototipo(id: number) {
  return this.http.delete(`${this.baseUrlDeleteCard}/${id}`);
}

}
