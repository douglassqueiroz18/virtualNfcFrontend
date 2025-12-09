import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagBankService {

  private baseUrl = 'http://localhost:8080/api/pagbank';

  constructor(private http: HttpClient) {}



}
