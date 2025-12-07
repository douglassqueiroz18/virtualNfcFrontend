export interface ProdutoFisico {
  id?: number;
  nome: string;
  tipo: 'pulseira' | 'relogio' | 'adesivo' | string;
  preco: number;
  descricao?: string;
}
