import { Routes } from '@angular/router';
import { cadastrarCartao } from './componentes/cadastrar-cartao/cadastrar-cartao';
import { midiasSociais } from './componentes/midias-sociais/midias-sociais';
import { paginaVisualizacao } from './componentes/paginaPrototipo/paginaPrototipo';
import { Comprar } from './componentes/comprar/comprar';
import { CardsComponent } from './componentes/cards/cards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastrar-cartao',
    pathMatch: 'full',
  },
  {
    path: 'cadastrar-cartao',
    component: cadastrarCartao,
  },
  {
    path: 'midias-sociais',
    component: midiasSociais,
  },
  {
    path: 'paginaPrototipo/:id',
    component: paginaVisualizacao,
  },
  {
    path: 'comprar',
    component: Comprar,
  },
  {
    path: 'cards',
    component: CardsComponent,
  }
];
