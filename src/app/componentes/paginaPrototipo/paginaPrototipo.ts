import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from '../../services/pagePrototipo.service';
import { CommonModule } from '@angular/common';
import { endPointService } from '../../endpointsService';

@Component({
  selector: 'pagina-visualizacao',
  templateUrl: './paginaPrototipo.html',
  styleUrls: ['./paginaPrototipo.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class paginaVisualizacao implements OnInit {

  page: PageData | null = null;
  loading = true;
  isExpired = false;
  remainingSeconds = 0;
  countdownInterval: any;
  constructor(
    private route: ActivatedRoute,
    private pageService: endPointService,
    private router: Router
  ) {}

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  console.log("ID recebido pela rota:", id);

  if (!id) {
    this.loading = false;
    console.warn("Nenhum ID encontrado na rota.");
    return;
  }

  const numericId = Number(id);
  console.log("ID convertido para número:", numericId);

  this.pageService.getPageByIdPrototipo(numericId).subscribe({
    next: (res) => {
      console.log("🟢 RESPOSTA DO BACKEND (getPageByIdPrototipo):", res);
      console.log("🟢 Payload recebido:", res?.payload);

      this.page = res;
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.isExpired = true;
      this.loading = false;
    }
  });
  // 2) Em paralelo, verifica protótipo
    this.pageService.checkPrototipo(numericId).subscribe({
      next: (res) => {
        console.log("🟡 CHECK:", res);

        // Caso expirado
        if (res.expired) {
          this.isExpired = true;
          return;
        }

        // Caso NÃO seja protótipo → não faz nada, apenas não mostra timer
        if (res.reason === "not_prototype") {
          console.warn("Não é protótipo → sem temporizador.");
          return;
        }

        // Caso seja protótipo válido → inicia timer
        this.startCountdown(res.remainingSeconds);
      },
      error: () => {
        this.isExpired = true;
      }
    });
  }
    startCountdown(seconds: number) {
    this.remainingSeconds = seconds;

    this.countdownInterval = setInterval(() => {
      this.remainingSeconds--;

      if (this.remainingSeconds <= 0) {
        clearInterval(this.countdownInterval);
        this.isExpired = true;
      }
    }, 1000);
  }
  formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');

  return `${h}:${m}:${s}`;
}
onBuyClick() {
  this.router.navigate(['/comprar']);
}

onEditClick() {
  if (!this.page?.id) {
    console.warn("Nenhum ID encontrado para edição.");
    return;
  }

  this.router.navigate(['/cliente-edita-cartao', this.page.id]);
}

}
