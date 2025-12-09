import { endPointService } from './../../endpointsService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // 👈 Import necessário
import { FormsModule } from '@angular/forms'; // Necessário para os imports do Componente de origem
import { PagBankService } from '../../services/PagBankService';

// Interface para a resposta da API PicPay (simplificada)

@Component({
  selector: 'app-checkout',
  standalone: true,
  // Adicionar FormsModule e o ActivatedRoute estará disponível
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './finalizar-compra.html',
  styleUrl: './finalizar-compra.scss',
})
export class FinalizarCompra implements OnInit {
  // Variáveis serão preenchidas pelos queryParams
  productName: string = 'Carregando...';
  productPrice: number = 0;

  pagbankData: any = null;
  chargeId: string = '';
  // Estado do Pagamento
  paymentStatus: 'pending' | 'success' | 'error' | 'initial' = 'initial';
  // Dados do PIX
  // Flag para controle do loader
  isLoading: boolean = false;

  // Injetar o PicpayService e o ActivatedRoute
  constructor(
    private endPointService: endPointService,
    private route: ActivatedRoute // 👈 Injeção para ler os parâmetros da URL
  ) {}

  ngOnInit(): void {
    // 🎯 Lógica para ler os parâmetros da URL no ngOnInit
    this.route.queryParams.subscribe(params => {
      // 1. Recebe o 'nome' e 'valor' da URL
      const nomeProduto = params['nome'];
      const valorProduto = params['preco'];

      if (nomeProduto && valorProduto) {
        this.productName = nomeProduto;
        // O valor vem como string da URL, precisa ser convertido para number
        this.productPrice = parseFloat(valorProduto);

        // Agora, o productName e productPrice têm os valores corretos.
      } else {
        console.warn('Dados do produto não encontrados nos parâmetros de rota.');
        this.productName = 'Erro ao carregar produto';
        this.productPrice = 0;
        this.paymentStatus = 'error';
      }
    });
  }

  /**
   * Simula a chamada à API do PicPay para gerar a transação PIX.
   */
generatePixPayment(): void {

  const orderData = {
    value: this.productPrice,
    description: `Compra: ${this.productName}`,
  };

  this.isLoading = true;

  this.endPointService.createPixPayment(orderData)
    .subscribe((response: any) => {

      this.pagbankData = {
        paymentUrl: response.links?.find((l: any) => l.rel === 'PAY')?.href || '',
        qrCode: response.qr_codes?.[0]?.text || '',
        qrPng: response.qr_codes?.[0]?.links?.find((l: any) => l.rel === 'QRCODE.PNG')?.href || ''
      };

      this.chargeId = response.id;

      this.paymentStatus = 'pending';
      this.isLoading = false;
    });
}



  /**
   * Simulação de verificação do status de pagamento (Polling).
   */
  simulatePolling(): void {
    setTimeout(() => {
      this.paymentStatus = 'success';
      console.log('Pagamento simulado como SUCESSO!');
    }, 15000);
  }

  /**
   * Método para copiar o código PIX para a área de transferência.
   */
  copyPixCode(): void {
    if (this.pagbankData?.qrCode) {
      navigator.clipboard.writeText(this.pagbankData.qrCode).then(() => {
        alert('Código PIX Copiado!');
      }).catch(err => {
        console.error('Falha ao copiar:', err);
      });
    }
  }

}
