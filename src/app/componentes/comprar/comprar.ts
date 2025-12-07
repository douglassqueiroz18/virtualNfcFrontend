import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Necessário para *ngFor
import { FormsModule } from '@angular/forms'; // Necessário para ngModel, mesmo que não esteja sendo usado diretamente no select
import { endPointService } from '../../endpointsService';
import { Router } from '@angular/router';
// Interface para definir a estrutura do seu objeto Produto
export interface Product {
  id: number;
  nome: string;
  preco: number; // Assumindo que a API retorna o preço com o nome 'valor'
  // Você pode adicionar mais campos se necessário (ex: tipo)
}

@Component({
  selector: 'app-comprar',
  // Adicione CommonModule e FormsModule aqui
  imports: [CommonModule, FormsModule],
  standalone: true, // Adicionado se for um componente standalone
  templateUrl: './comprar.html',
  styleUrl: './comprar.scss',
})
export class Comprar implements OnInit { // Implementa OnInit

  // Lista de todos os produtos carregados da API
  products: Product[] = [];

  // Preço que será exibido no template
  price: number = 0;

  // Variável para armazenar o ID do produto selecionado, se necessário
  selectedProductId: number | null = null;

  // Injeção do Serviço no construtor
  constructor(private service: endPointService,  private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Busca os produtos e preenche a lista
    this.service.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;

        // 🚨 Define o preço inicial para o primeiro produto, se existir
        if (this.products.length > 0) {
          this.price = this.products[0].preco;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        // Trate o erro (ex: exibir mensagem de erro para o usuário)
      }
    });
  }

  // O método agora usa o ID (ou nome) do produto selecionado
  onProductChange(event: Event) {
    // Converte o event para HTMLSelectElement para acessar o 'value'
    const target = event.target as HTMLSelectElement;
    const selectedId = Number(target.value);

    // Encontra o produto completo na lista carregada
    const selectedProduct = this.products.find(p => p.id === selectedId); // Assumindo que o <option value> é o 'nome'
    console.log('Produto selecionado:', selectedProduct);
    if (selectedProduct) {
      this.price = selectedProduct.preco;
      this.selectedProductId = selectedProduct.id;
      console.log('Preço atualizado para:', this.price);
    } else {
      console.error(`Produto com valor '${selectedId}' não encontrado.`);
      this.price = 0; // Preço padrão ou 0 se não encontrado
    }
  }
  buyNow(): void {
  // 1. Encontrar o produto atualmente selecionado (o preço atual é o guia)
  const selectedProduct = this.products.find(p => p.id === this.selectedProductId);

  if (selectedProduct) {
    // 2. Navegar para a rota de checkout, passando os dados via Parâmetros de Rota (query params)
    this.router.navigate(['/finalizar-compra'], {
      queryParams: {
        id: selectedProduct.id,
        nome: selectedProduct.nome,
        preco: selectedProduct.preco
      }
    });
  } else {
    alert('Selecione um produto antes de comprar.');
  }
}
}
