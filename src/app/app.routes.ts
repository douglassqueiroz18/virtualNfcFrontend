import { Routes } from '@angular/router';
import { cadastrarCartao } from './componentes/cadastrar-cartao/cadastrar-cartao';
import { midiasSociais } from './componentes/midias-sociais/midias-sociais';
import { paginaVisualizacao } from './componentes/pagina/pagina';
import { Comprar } from './componentes/comprar/comprar';
import { CardsComponent } from './componentes/cards/cards';
import { AdmProdutos } from './componentes/adm-produtos/adm-produtos';
import { FinalizarCompra } from './componentes/finalizar-compra/finalizar-compra';
import { ClienteEditaCartao } from './componentes/cliente-edita-cartao/cliente-edita-cartao';
import { LoginComponent } from './componentes/login/login';
import { AcessarPagina } from './componentes/acessar-pagina/acessar-pagina';

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
    path: 'pagina/:id',
    component: paginaVisualizacao,
  },
  {
    path: 'comprar',
    component: Comprar,
  },
  {
    path: 'cards',
    component: CardsComponent,
  },
  {
    path: 'adm-produtos',
    component: AdmProdutos,
  },
  {
    path: 'finalizar-compra',
    component: FinalizarCompra,
  },
  {
    path: 'cliente-edita-cartao/:id',
    component: ClienteEditaCartao,
  },
  {
    path: 'login',
    component: LoginComponent
  },
    {
    path: 'acessar-pagina',
    component: AcessarPagina
  }
];
