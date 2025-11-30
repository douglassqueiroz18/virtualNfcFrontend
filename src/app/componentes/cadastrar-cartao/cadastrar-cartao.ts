import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { midiasSociais } from '../midias-sociais/midias-sociais';

@Component({
  selector: 'cadastrar-cartao',
  standalone: true,
  imports: [CommonModule, midiasSociais],
  templateUrl: './cadastrar-cartao.html',
  styleUrl: './cadastrar-cartao.scss',
})
export class cadastrarCartao {
  showMidiasSociais = false;

  beClienteClick() {
    this.showMidiasSociais = true;
  }

  voltarClick() {
    this.showMidiasSociais = false;
  }
}
