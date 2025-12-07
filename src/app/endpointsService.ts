import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PageData } from './services/pagePrototipo.service';

@Injectable({ providedIn: 'root' })
export class endPointService {

  private baseUrl = 'http://localhost:8080/api/pages';
  private baseUrlGetAllCards = 'http://localhost:8080/api/pages/all';
  private baseUrlDeleteCard = 'http://localhost:8080/api/pages/delete';
  private baseUrlCreatePage = 'http://localhost:8080/api/pages/create';
  private baseUrlGetPageById = 'http://localhost:8080/api/pages/get';
  private baseUrlCheckPrototipo = 'http://localhost:8080/api/pages/prototipo/check';
  private baseUrlUpdateProduct = 'http://localhost:8080/api/products/update';
  private baseUrlGetAllProducts = 'http://localhost:8080/api/products/all';
  private baseUrlCreateProduct = 'http://localhost:8080/api/products/create';
  private baseUrlDeleteProduct = 'http://localhost:8080/api/products/delete';
  private baseUrlGetProductById = 'http://localhost:8080/api/products/get';
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
checkPrototipo(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrlCheckPrototipo}/${id}`);
}

  // Criar produto
  createProduct(dto: any): Observable<number> {
    return this.http.post<number>(`${this.baseUrlCreateProduct}`, dto);
  }
   // Listar todos os produtos
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlGetAllProducts}`);
  }

  // Buscar produto por ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlGetProductById}/${id}`);
  }

  // Atualizar produto
  updateProduct(id: number, dto: any): Observable<any> {
    return this.http.put(`${this.baseUrlUpdateProduct}/${id}`, dto);
  }

deleteProduct(id: number): Observable<HttpResponse<any>> {
  // Retorna a resposta HTTP COMPLETA
  return this.http.delete<any>(`${this.baseUrlDeleteProduct}/${id}`, {
    observe: 'response', // <--- ESSENCIAL: Diz ao Angular para retornar a resposta completa
    responseType: 'text' as 'json' // Mantém o 'responseType: text' (ajustado para funcionar com observe: 'response')
  });
}
}
