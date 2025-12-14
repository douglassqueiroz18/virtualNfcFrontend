
export interface PageData {
type: 'social' | 'endereco' | 'custom';
id: number;

  payload: {
    nomeCartao?: string;
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    site?: string;
    backgroundMode?: 'solid' | 'gradient';
    backgroundColor?: string;
    backgroundColor2?: string;
    logoBase64?: string;
  };
}

