import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCartao } from './cadastrar-cartao';

describe('CadastrarCartao', () => {
  let component: CadastrarCartao;
  let fixture: ComponentFixture<CadastrarCartao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarCartao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCartao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
