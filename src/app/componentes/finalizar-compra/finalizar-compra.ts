import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PicpayService } from './PicPayService';
import { ActivatedRoute } from '@angular/router'; // 👈 Import necessário
import { FormsModule } from '@angular/forms'; // Necessário para os imports do Componente de origem

// Interface para a resposta da API PicPay (simplificada)
interface PicpayResponse {
  paymentUrl: string; // Link para pagamento (para o usuário)
  qrCode: string;     // Conteúdo do PIX QR Code (para ser exibido)
}

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

  // Estado do Pagamento
  paymentStatus: 'pending' | 'success' | 'error' | 'initial' = 'initial';
  // Dados do PIX
  picpayData: PicpayResponse | null = null;
  // Flag para controle do loader
  isLoading: boolean = false;

  // Injetar o PicpayService e o ActivatedRoute
  constructor(
    private picpayService: PicpayService,
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
    if (this.productPrice <= 0) {
        alert('Valor do produto inválido. Tente selecionar novamente.');
        return;
    }

    this.isLoading = true;
    this.paymentStatus = 'pending';
    this.picpayData = null;

    // Dados que seriam enviados ao PicPay (usando os dados carregados da URL)
    const orderData = {
      value: this.productPrice, // Usando o preço carregado
      description: `Compra: ${this.productName}`, // Usando o nome carregado
      // Outros dados necessários
    };

    // Chama o serviço para criar o pagamento
    this.picpayService.createPayment(orderData).subscribe({
      next: (response: PicpayResponse) => {
        this.picpayData = response;
        this.isLoading = false;
        this.paymentStatus = 'pending';
        this.simulatePolling();
      },
      error: (err) => {
        console.error('Erro ao gerar pagamento PIX:', err);
        this.isLoading = false;
        this.paymentStatus = 'error';
        this.picpayData = null;
      }
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
    if (this.picpayData?.qrCode) {
      navigator.clipboard.writeText(this.picpayData.qrCode).then(() => {
        alert('Código PIX Copiado!');
      }).catch(err => {
        console.error('Falha ao copiar:', err);
      });
    }
  }
}
