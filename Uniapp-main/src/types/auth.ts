export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  curso: string;
}

export interface AuthenticatedUser {
  id: number;
  nome: string;
  emailInstitucional: string;
  curso: string;
  reputacao: number;
}

export interface AuthResponse {
  token: string;
  usuario: AuthenticatedUser;
}
