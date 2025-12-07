import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private pageService: endPointService
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
}

}
