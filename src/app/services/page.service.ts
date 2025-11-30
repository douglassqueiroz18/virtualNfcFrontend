import { Injectable } from '@angular/core';

export interface PageData {
  type: 'social' | 'endereco' | 'custom';
  payload: any;
}

@Injectable({ providedIn: 'root' })
export class PageService {
  private currentPage: PageData | null = null;

  // Gera um ID simples único. Usa crypto.randomUUID() quando disponível.
  private generateId(): string {
    try {
      // browser environment
      // @ts-ignore
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        // @ts-ignore
        return crypto.randomUUID();
      }
    } catch (e) {}
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  }

  /**
   * Cria e persiste uma página. Retorna o ID gerado.
   */
  createPage(data: PageData): string {
    const id = this.generateId();
    this.currentPage = { ...data };
    try {
      localStorage.setItem(`page:${id}`, JSON.stringify(this.currentPage));
      // opcional: manter índice de páginas geradas
      const indexRaw = localStorage.getItem('pagesIndex');
      const index = indexRaw ? JSON.parse(indexRaw) as string[] : [];
      if (!index.includes(id)) {
        index.push(id);
        localStorage.setItem('pagesIndex', JSON.stringify(index));
      }
      localStorage.setItem('latestPageId', id);
    } catch (e) {
      console.warn('Could not persist page to localStorage', e);
    }
    return id;
  }

  getPage(): PageData | null {
    return this.currentPage;
  }

  getPageById(id: string): PageData | null {
    if (!id) return null;
    try {
      const raw = localStorage.getItem(`page:${id}`);
      if (raw) {
        return JSON.parse(raw) as PageData;
      }
    } catch (e) {
      console.warn('Could not read page from localStorage by id', e);
    }
    return null;
  }

  clear() {
    this.currentPage = null;
    try { localStorage.removeItem('generatedPage'); } catch {}
  }
}
