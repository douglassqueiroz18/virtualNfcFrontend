import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endPointService } from '../../endpointsService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cliente-edita-cartao',
  templateUrl: './cliente-edita-cartao.html',
  styleUrl: './cliente-edita-cartao.scss',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ClienteEditaCartao implements OnInit {

  id!: number;
  currentPage: any = {};

  instagramUser = '';
  whatsappNumber = '';
  facebookUser = '';
  linkedinUser = '';
  youtubeUser = '';
  siteDomain = '';
  backgroundColor = '';
  bgType: 'solid' | 'gradient' = 'solid';
  backgroundColor1 = '#263242';
  backgroundColor2 = '#1a222d';
  logoBase64: string | null = null;
  logoPreview: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private service: endPointService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPageById();
  }

  loadPageById() {
    this.service.getPageById(this.id).subscribe({
      next: (data) => {
        this.currentPage = data;

        // Extrair só o usuário
        this.instagramUser = this.extractUsername(data.instagram);
        this.whatsappNumber = this.extractWhatsapp(data.whatsapp);
        this.facebookUser = this.extractUsername(data.facebook);
        this.linkedinUser = this.extractUsername(data.linkedin);
        this.youtubeUser = this.extractYoutube(data.youtube);
        this.siteDomain = this.extractDomain(data.site);
// ----- Lógica de cores -----
        const bg = data.backgroundColor || '#263242';

        if (bg.includes('linear-gradient')) {
          this.bgType = 'gradient';

          const match = bg.match(/#([0-9a-fA-F]{6})/g);
          if (match && match.length >= 2) {
            this.backgroundColor1 = match[0];
            this.backgroundColor2 = match[1];
          }
        } else {
          this.bgType = 'solid';
          this.backgroundColor1 = bg;
        }

      },
      error: (err) => console.error("Erro ao carregar:", err)
    });
  }

  // ------------------------
  // Métodos de Extração
  // ------------------------
  extractUsername(url?: string): string {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?[a-zA-Z0-9]+\.com\/(@?)/, '');
  }

  extractWhatsapp(url?: string): string {
    if (!url) return '';
    return url.replace(/^https?:\/\/wa\.me\//, '');
  }

  extractYoutube(url?: string): string {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?youtube\.com\//, '');
  }

  extractDomain(url?: string): string {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  // ------------------------
  // Salvar montando URLs
  // ------------------------
  savePage() {
  this.currentPage.instagram =
    this.instagramUser.trim() !== ''
      ? `https://instagram.com/${this.instagramUser}`
      : '';

  this.currentPage.whatsapp =
    this.whatsappNumber.trim() !== ''
      ? `https://wa.me/${this.whatsappNumber}`
      : '';

  this.currentPage.facebook =
    this.facebookUser.trim() !== ''
      ? `https://facebook.com/${this.facebookUser}`
      : '';

  this.currentPage.linkedin =
    this.linkedinUser.trim() !== ''
      ? `https://linkedin.com/in/${this.linkedinUser}`
      : '';

  this.currentPage.youtube =
    this.youtubeUser.trim() !== ''
      ? `https://youtube.com/${this.youtubeUser}`
      : '';

  this.currentPage.site =
    this.siteDomain.trim() !== ''
      ? `https://${this.siteDomain}`
      : '';

    // ----- Monta o background -----
    if (this.bgType === 'solid') {
      this.currentPage.backgroundColor = this.backgroundColor1;
    } else {
      this.currentPage.backgroundColor =
        `linear-gradient(135deg, ${this.backgroundColor1}, ${this.backgroundColor2})`;
    }
    if (this.logoBase64) {
      this.currentPage.logoBase64 = this.logoBase64;
    }
  this.service.updatePagina(this.currentPage.id, this.currentPage).subscribe({
    next: () => console.log("Atualizado!"),
    error: (err) => console.error(err)
  });

}


  goBack() {
    this.router.navigate(['/pagina', this.id]);
  }
  onLogoSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const result = reader.result as string;

    this.logoBase64 = result;
    this.logoPreview = result; // preview direto
  };

  reader.readAsDataURL(file); // <-- Base64
}
}
