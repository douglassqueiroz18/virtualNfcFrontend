import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'pagina-visualizacao',
  templateUrl: './pagina.html',
  styleUrls: ['./pagina.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class paginaVisualizacao {
  data: any = null;
  // Mapeamento de chaves para nomes de ícones do Material Icons
iconMap: { [key: string]: string } = {
  instagram: 'ri-instagram-line', // Ícone do Remix Icon para Instagram
  whatsapp: 'ri-whatsapp-line',  // Ícone do Remix Icon para WhatsApp
  facebook: 'ri-facebook-box-fill', // Ícone do Remix Icon para Facebook
  linkedin: 'ri-linkedin-box-fill', // Ícone do Remix Icon para LinkedIn
  tiktok: 'ri-tiktok-fill',    // Ícone do Remix Icon para TikTok
  youtube: 'ri-youtube-fill',   // Ícone do Remix Icon para YouTube
  site: 'ri-global-line',     // Ícone do Remix Icon para Site/Global
 };
  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router // Injetar o serviço Location
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.data = this.pageService.getPageById(id);
    }
    // fallback para última página em memória
    if (!this.data) {
      this.data = this.pageService.getPage();
    }
  }
// NOVO MÉTODO: usa o serviço Location para navegar para trás no histórico
  goBack(): void {
    // A função back() simula o clique no botão "Voltar" do navegador
    this.router.navigate(['/midias-sociais']);
  }
  // helper usado pelo template para obter chaves de um objeto (evita uso direto de global Object no template)
  keys(obj: any): string[] {
    try {
      return obj ? Object.keys(obj) : [];
    } catch (e) {
      return [];
    }
  }
  getIconName(key: string): string {
    return this.iconMap[key.toLowerCase()] || 'link'; // 'link' é o fallback
  }

}
