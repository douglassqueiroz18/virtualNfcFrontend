import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../services/page.service';
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
  imports: [CommonModule, FormsModule], // <--- AQUI!
})
export class midiasSociais {
  @Output() voltar = new EventEmitter<void>();
  constructor(private pageService: PageService, private router: Router) {}

  social: Social = {
    instagram: '',
    whatsapp: '',
    facebook: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
    site: '',
  };

  // campos auxiliares para entrada simplificada
  instagramUsername = '';
  whatsappDDD = '';
  whatsappNumber = '';

  socialFields = [
    {
      key: 'facebook',
      label: 'Facebook',
      placeholder: 'https://facebook.com/...',
      icon: 'ri-facebook-circle-line',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      placeholder: 'https://linkedin.com/in/...',
      icon: 'ri-linkedin-line',
    },
    {
      key: 'tiktok',
      label: 'TikTok',
      placeholder: 'https://tiktok.com/@...',
      icon: 'ri-tiktok-fill',
    },
    {
      key: 'youtube',
      label: 'YouTube',
      placeholder: 'https://youtube.com/@...',
      icon: 'ri-youtube-line',
    },
    { key: 'site', label: 'Site', placeholder: 'Seu site...', icon: 'ri-global-line' },
  ];

  save() {
    // Normaliza os campos conforme a entrada simplificada do usuário
    const defaultCountry = '55'; // ajuste conforme necessário

    const payload: any = { ...this.social };

    // Instagram: monta URL a partir do username, se fornecido
    if (this.instagramUsername && this.instagramUsername.trim()) {
      const username = this.instagramUsername.trim().replace(/^@/, '');
      payload.instagram = `https://instagram.com/${username}`;
    } else if (payload.instagram && payload.instagram.trim()) {
      // mantém campo caso já tenha sido preenchido diretamente
    } else {
      payload.instagram = '';
    }

    // WhatsApp: monta link a partir de DDD + número (apenas dígitos)
    const ddd = (this.whatsappDDD || '').replace(/\D/g, '');
    const num = (this.whatsappNumber || '').replace(/\D/g, '');
    if (ddd && num) {
      // assumimos código de país default (ex.: Brasil = 55)
      payload.whatsapp = `https://wa.me/${defaultCountry}${ddd}${num}`;
    } else if (payload.whatsapp && payload.whatsapp.trim()) {
      // mantém caso usuário tenha preenchido manualmente
    } else {
      payload.whatsapp = '';
    }

    // cria a página e recupera o id
    const id = this.pageService.createPage({ type: 'social', payload });
    try {
      this.router.navigate(['/pagina', id]);
    } catch (e) {
      console.warn('Não foi possível navegar:', e);
    }
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
    const valor = event.target.value.replace(/\D/g, ''); // mantém só números
    this.whatsappDDD = valor.slice(0, 2); // agora limita para 2 dígitos

    // Quando completar 2 dígitos, pula automaticamente
    if (this.whatsappDDD.length === 2) {
      numeroInput.focus();
    }
  }
  onPhoneChange(event: any, nextElement: HTMLElement) {
  let valor = event.target.value.replace(/\D/g, '');
  valor = valor.slice(0, 9);

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
