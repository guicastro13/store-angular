export interface User {
  id: string;
  name: string;
  email: string;
  address: {
    cep: string;
    uf: string;
    city: string;
    street: string;
  };
  created_at: string;
  updated_at: string;
}
