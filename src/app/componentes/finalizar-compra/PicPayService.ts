import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicpayService {
  // ⚠️ URL de exemplo. A URL REAL do PicPay seria chamada pelo seu BACKEND.
  // Em um projeto real, NUNCA chame uma API de pagamento diretamente do frontend.
  private apiUrl = '/api/picpay/checkout';

  constructor(private http: HttpClient) { }

  createPayment(orderData: any): Observable<any> {
    // 💡 Simulação da resposta da API PicPay/Backend
    // Em produção, isso seria: return this.http.post(this.apiUrl, orderData);

    // Retorna um Observable simulado
    return of({
      paymentUrl: 'https://picpay.me/link-simulado',
      qrCode: '00020126330014BR.GOV.BCB.PIX01111234567890520400005303986540549.905802BR5907PICPAY6008BRASILIA62070503***6304037A',
    });
  }
}
