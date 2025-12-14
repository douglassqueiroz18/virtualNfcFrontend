import { endPointService } from './../../endpointsService';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Social } from '../../interfaces/social';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'midias-sociais',
  templateUrl: './midias-sociais.html',
  styleUrls: ['./midias-sociais.scss'],
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  imports: [CommonModule, FormsModule],
})
export class midiasSociais {
  @Output() voltar = new EventEmitter<void>();

  constructor(
    private router: Router,
    private endPointService: endPointService
  ) {}

  prototipoId: number | null = null;

  social: Social = {
    nomeCartao: '',
    instagram: '',
    whatsapp: '',
    facebook: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
    site: '',
  };

  instagramUsername = '';
  whatsappDDD = '';
  whatsappNumber = '';

  socialFields = [
    { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...', icon: 'ri-facebook-circle-line' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...', icon: 'ri-linkedin-line' },
    { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@...', icon: 'ri-tiktok-fill' },
    { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@...', icon: 'ri-youtube-line' },
    { key: 'site', label: 'Site', placeholder: 'Seu site...', icon: 'ri-global-line' },
  ];

  save() {
    const defaultCountry = '55';

    const dto: any = {
      type: 'social',
      nomeCartao: this.social.nomeCartao,
      instagram: '',
      whatsapp: '',
      facebook: this.social.facebook,
      linkedin: this.social.linkedin,
      tiktok: this.social.tiktok,
      youtube: this.social.youtube,
      site: this.social.site,
      prototipo: '1'
    };

    // Instagram
    if (this.instagramUsername.trim()) {
      dto.instagram = `https://instagram.com/${this.instagramUsername.replace(/^@/, '')}`;
    }

    // WhatsApp
    const ddd = (this.whatsappDDD || '').replace(/\D/g, '');
    const num = (this.whatsappNumber || '').replace(/\D/g, '');
    dto.whatsapp = (ddd && num) ? `https://wa.me/${defaultCountry}${ddd}${num}` : '';

    // envia para o backend
    this.endPointService.createPagePrototipo(dto).subscribe((id: number) => {
      console.log('Prototipo criado com ID:', id);
      this.prototipoId = id; // agora exibe o botão
    });
  }

verPrototipo(card?: any) {
  // Se o método receber o card pelo HTML, extrai o id dele
  if (card && typeof card === 'object') {
    this.prototipoId = card.id;
  }

  const numericId = Number(this.prototipoId);

  console.log("ID resolvido:", numericId, "tipo:", typeof numericId);

  if (!numericId || Number.isNaN(numericId)) {
    console.error("ID inválido, não é possível abrir o protótipo.");
    return;
  }

  window.open(`/pagina/${numericId}`, '_blank');
}



  voltarClick() {
    this.voltar.emit();
  }

  getSocialValue(key: string): string {
    return this.social[key as keyof Social] || '';
  }

  setSocialValue(key: string, value: string): void {
    this.social[key as keyof Social] = value;
  }

  onDDDChange(event: any, numeroInput: HTMLInputElement) {
    const valor = event.target.value.replace(/\D/g, '');
    this.whatsappDDD = valor.slice(0, 2);
    if (this.whatsappDDD.length === 2) numeroInput.focus();
  }

  onPhoneChange(event: any, nextElement: HTMLElement) {
    let valor = event.target.value.replace(/\D/g, '').slice(0, 9);

    if (valor.length > 5) {
      this.whatsappNumber = `${valor[0]} ${valor.slice(1, 5)}-${valor.slice(5)}`;
    } else if (valor.length > 1) {
      this.whatsappNumber = `${valor[0]} ${valor.slice(1)}`;
    } else {
      this.whatsappNumber = valor;
    }

    if (valor.length === 9) nextElement.focus();
  }
}
