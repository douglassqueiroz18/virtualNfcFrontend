import { Component, OnInit } from '@angular/core';
import { endPointService } from '../../endpointsService';
import { CommonModule, JsonPipe } from '@angular/common';
import {trigger,state,style,transition,animate,} from '@angular/animations';

@Component({
  selector: 'cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss'],
  standalone: true,
  imports: [ CommonModule],
    animations: [
    trigger('fadeCard', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class CardsComponent implements OnInit {

  cards: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private endpoint: endPointService) {}

  ngOnInit(): void {
    this.loadCards();
  }

loadCards() {
  this.endpoint.getAllCards().subscribe({
  next: (data) => {
    this.cards = data ?? [];
    console.log("Cards:", this.cards);
    this.loading = false; // <- MOVE PARA O NEXT
  },

    error: (err) => {
      this.error = 'Erro ao carregar cartões';
      console.error(err);
    },
    complete: () => {
      this.loading = false;
    }
  });
}
deleteCard(id: number) {
  if (!confirm("Tem certeza que deseja excluir este cartão?")) return;

  this.endpoint.deleteCardPrototipo(id).subscribe({
    next: () => {
      this.cards = this.cards.filter(c => c.id !== id);
    }
  });
  this.loadCards();
}
copySerial(serial: string) {
  navigator.clipboard.writeText(serial)
    .then(() => {
      alert("Serial copiada!");
    })
    .catch(() => {
      alert("Erro ao copiar.");
    });
}
}
