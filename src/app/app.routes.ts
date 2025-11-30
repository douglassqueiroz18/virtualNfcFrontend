import { Routes } from '@angular/router';
import { cadastrarCartao } from './componentes/cadastrar-cartao/cadastrar-cartao';
import { midiasSociais } from './componentes/midias-sociais/midias-sociais';
import { paginaVisualizacao } from './componentes/pagina/pagina';

export const routes: Routes = [
  {
    path: 'cadastrar-cartao',
    component: cadastrarCartao,
}, {
  path: 'midias-sociais',
  component: midiasSociais
}
, {
  path: 'pagina/:id',
  component: paginaVisualizacao
}
];
