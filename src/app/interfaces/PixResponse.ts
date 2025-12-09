interface PixResponse {
  id: string;
  point_of_interaction?: {
    transaction_data?: {
      qr_code?: string;
      qr_code_base64?: string;
    }
  };
  links?: any[];
}
