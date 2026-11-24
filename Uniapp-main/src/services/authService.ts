import { API_ROUTES } from '../config/api.back.config';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import { requestJson } from './apiClient';

export function login(credentials: LoginRequest): Promise<AuthResponse> {
  return requestJson<AuthResponse>(API_ROUTES.auth.login, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function register(data: RegisterRequest): Promise<AuthResponse> {
  return requestJson<AuthResponse>(API_ROUTES.auth.register, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
