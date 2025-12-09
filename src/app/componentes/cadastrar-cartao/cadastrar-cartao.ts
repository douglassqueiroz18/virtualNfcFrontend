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
  messages = [
    'Conecte pessoas ao seu mundo com um toque.',
    'Explore pagamentos instantâneos e seguros.',
    'Transforme a experiência NFC hoje mesmo.',
  ];
  currentMessage = '';
  messageIndex = 0;
  charIndex = 0;
  titleText = 'Bem-vindo à Virtual NFC';
  typedTitle = '';
  titleCharIndex = 0;
  beClienteClick() {
    this.showMidiasSociais = true;
  }
  ngOnInit() {
    this.typeTitle();
    this.typeMessage();
  }
  typeMessage() {
    if (this.charIndex < this.messages[this.messageIndex].length) {
      this.currentMessage += this.messages[this.messageIndex][this.charIndex];
      this.charIndex++;
      setTimeout(() => this.typeMessage(), 100);
    } else {
      setTimeout(() => this.nextMessage(), 2000);
    }
  }
  nextMessage() {
    this.messageIndex = (this.messageIndex + 1) % this.messages.length;
    this.currentMessage = '';
    this.charIndex = 0;
    this.typeMessage();
  }
  typeTitle() {
    if (this.titleCharIndex < this.titleText.length) {
      this.typedTitle += this.titleText[this.titleCharIndex];
      this.titleCharIndex++;
      setTimeout(() => this.typeTitle(), 80); // ajusta a velocidade da digitação
    }
  }
  voltarClick() {
    this.showMidiasSociais = false;
  }
}
