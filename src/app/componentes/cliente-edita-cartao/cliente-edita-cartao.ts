import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endPointService } from '../../endpointsService';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'cliente-edita-cartao',
templateUrl: './cliente-edita-cartao.html',
styleUrl: './cliente-edita-cartao.scss',
standalone: true,
imports: [FormsModule],
})
export class ClienteEditaCartao implements OnInit {

id!: number;
currentPage: any = {};

constructor(private route: ActivatedRoute, private service: endPointService,   private router: Router
) {}

ngOnInit() {
this.id = Number(this.route.snapshot.paramMap.get('id'));
console.log("ID recebido para edição:", this.id);
this.loadPageById();

}
// 🔥 AQUI está o método que você pediu
loadPageById() {
this.service.getPageById(this.id).subscribe({
  next: (data) => {
    console.log("Dados recebidos do backend:", data);
    this.currentPage = data;
  },
  error: (err) => {
    console.error("Erro ao carregar a página:", err);
  }
});
}
savePage() {
if (this.currentPage.id) {
this.service.updatePaginaPrototipo(this.currentPage.id, this.currentPage)
  .subscribe({
    next: (res) => console.log("Atualizado:", res),
    error: (err) => console.error("Erro ao atualizar:", err)
  });
}
}
goBack() {
  if (!this.id) {
    console.warn("Nenhum ID encontrado para voltar.");
    return;
  }

  this.router.navigate(['/paginaPrototipo', this.id]);
}
}
