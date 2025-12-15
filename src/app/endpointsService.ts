import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PageData } from './services/pagePrototipo.service';

@Injectable({ providedIn: 'root' })
export class endPointService {

  private baseUrl = import.meta.env.VITE_API_BASE_URL + '/pages';
  private baseUrlGetAllCards = this.baseUrl + '/all';
  private baseUrlDeleteCard = this.baseUrl + '/delete';
  private baseUrlCreatePage = this.baseUrl + '/create';
  private baseUrlGetPageById = this.baseUrl + '/get';
  private baseUrlCheckPrototipo = this.baseUrl + '/prototipo/check';
  private baseUrlUpdatePage = this.baseUrl + '/update';
  private baseUrlGetPageByIdPrototipo = this.baseUrl + '/prototipo/get';
  private baseAcessarPagina = this.baseUrl + '/access';

  // Products
  private baseProductUrl = import.meta.env.VITE_API_BASE_URL + '/products';
  private baseUrlUpdateProduct = this.baseProductUrl + '/update';
  private baseUrlGetAllProducts = this.baseProductUrl + '/all';
  private baseUrlCreateProduct = this.baseProductUrl + '/create';
  private baseUrlDeleteProduct = this.baseProductUrl + '/delete';
  private baseUrlGetProductById = this.baseProductUrl + '/get';

  // PagBank
  private basePagBankUrl = import.meta.env.VITE_API_BASE_URL + '/pagbank';
  private baseUrlpagbank = this.basePagBankUrl;

  // Auth
  private baseLogin = import.meta.env.VITE_API_BASE_URL + '/auth/login';

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
            site: page.site ?? '',
            backgroundColor: page.backgroundColor ?? '#263242'
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
  getPageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlGetPageById}/${id}`);
  }
  // Atualizar produto
  updateProduct(id: number, dto: any): Observable<any> {
    return this.http.put(`${this.baseUrlUpdateProduct}/${id}`, dto);
  }
  updatePagina(id: number, dto: any) {
    return this.http.put(`${this.baseUrlUpdatePage}/${id}`, dto);
  }

deleteProduct(id: number): Observable<HttpResponse<any>> {
  // Retorna a resposta HTTP COMPLETA
  return this.http.delete<any>(`${this.baseUrlDeleteProduct}/${id}`, {
    observe: 'response', // <--- ESSENCIAL: Diz ao Angular para retornar a resposta completa
    responseType: 'text' as 'json' // Mantém o 'responseType: text' (ajustado para funcionar com observe: 'response')
  });
}
  createPixPayment(data: any) {
    data.value = Math.round(data.value * 100);
    return this.http.post(`${this.baseUrlpagbank}/pix`, data);
  }
  checkStatus(chargeId: string): Observable<any> {
    return this.http.get(`${this.baseUrlpagbank}/pix/${chargeId}`);
  }
  getPublicKey(): Observable<any> {
  return this.http.get(`${this.baseUrlpagbank}/public-key`);
  }
  login(body: { email: string; password: string }) {
    return this.http.post(`${this.baseLogin}`, body);
  }
  acessarPagina(serialKey: string) {
    return this.http.get(`${this.baseAcessarPagina}/${serialKey}`);
  }


}
