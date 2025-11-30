import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'endereco',
  templateUrl: './endereco.html',
  styleUrls: ['./endereco.scss'],
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  imports: [CommonModule, FormsModule]
})
export class endereco {
  @Output() voltar = new EventEmitter<void>();

  endereco = {
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  };

  campos = [
    { key: 'rua', label: 'Rua', placeholder: 'Nome da rua', icon: 'ri-map-pin-line' },
    { key: 'numero', label: 'Número', placeholder: '0000', icon: 'ri-hash-tag' },
    { key: 'complemento', label: 'Complemento', placeholder: 'Apto, sala, etc.', icon: 'ri-building-line' },
    { key: 'bairro', label: 'Bairro', placeholder: 'Nome do bairro', icon: 'ri-map-line' },
    { key: 'cidade', label: 'Cidade', placeholder: 'Nome da cidade', icon: 'ri-city-line' },
    { key: 'estado', label: 'Estado', placeholder: 'Sigla (ex: SP)', icon: 'ri-map-2-line' },
    { key: 'cep', label: 'CEP', placeholder: '00000-000', icon: 'ri-mail-line' }
  ];

  save() {
    console.log('Dados de endereço enviados:', this.endereco);
    alert('Endereço salvo com sucesso!');
  }

  getEnderecoValue(key: string): string {
    return this.endereco[key as keyof typeof this.endereco] || '';
  }

  setEnderecoValue(key: string, value: string): void {
    this.endereco[key as keyof typeof this.endereco] = value;
  }

  voltarClick() {
    this.voltar.emit();
  }
}
