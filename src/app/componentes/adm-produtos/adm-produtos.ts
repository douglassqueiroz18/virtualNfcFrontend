import { Component, OnInit } from '@angular/core';
import { endPointService } from '../../endpointsService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'adm-produtos',
  templateUrl: './adm-produtos.html',
  styleUrls: ['./adm-produtos.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],

})
export class AdmProdutos implements OnInit {
  products: any[] = [];
  currentProduct: any = {};

  constructor(private service: endPointService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  saveProduct() {
    if (this.currentProduct.id) {
      this.service.updateProduct(this.currentProduct.id, this.currentProduct)
        .subscribe(() => {
          this.loadProducts();
          this.resetForm(); // agora existe
        });
    } else {
      this.service.createProduct(this.currentProduct)
        .subscribe(() => {
          this.loadProducts();
          this.resetForm(); // agora existe
        });
    }
  }

  // Método para limpar o formulário
  resetForm() {
    this.currentProduct = {};
  }
  editProduct(product: any) {
    this.currentProduct = { ...product };
  }
deleteProduct(id: number) {
  // O subscribe agora será acionado no 'next' se a API retornar 200 OK (com ou sem corpo) ou 204 No Content.
  this.service.deleteProduct(id).subscribe({
    next: () => {
      // ✅ Requisição bem-sucedida
      this.loadProducts();
      alert('Produto excluído com sucesso!'); // Excluído com sucesso!
    },
    error: (err) => {
      // ❌ Este bloco só será acionado por erros reais (4xx, 5xx, ou erro de rede).
      console.error('Erro ao deletar produto:', err);
      alert('Erro ao tentar excluir o produto.');
    }
  });
}
}
