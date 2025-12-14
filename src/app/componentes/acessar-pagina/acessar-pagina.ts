import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { endPointService } from '../../endpointsService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'acessar-pagina',
  templateUrl: './acessar-pagina.html',
  styleUrls: ['./acessar-pagina.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AcessarPagina {

  serialKey: string = '';
  loading = false;
  errorMessage = '';

  constructor(private endpoint: endPointService, private router: Router) {}

  buscarPagina() {
  this.errorMessage = '';

  if (!this.serialKey || this.serialKey.trim().length < 6) {
    this.errorMessage = 'Serial inválido.';
    return;
  }

  this.loading = true;

  this.endpoint.acessarPagina(this.serialKey).subscribe({
    next: (res: any) => {
      this.loading = false;

      if (!res?.valid || !res?.page?.id) {
        this.errorMessage = 'Serial não encontrado ou inválido.';
        return;
      }

      const id = res.page.id;
      this.router.navigate(['/cliente-edita-cartao', id]);
    },

    error: () => {
      this.loading = false;
      this.errorMessage = 'Erro ao buscar página.';
    }
  });
}

}
