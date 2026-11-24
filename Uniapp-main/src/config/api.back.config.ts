const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

export const API_BASE_URL = (
  configuredApiUrl || 'http://localhost:8080/api'
).replace(/\/+$/, '');

export const API_ROUTES = {
  auth: {
    login: 'auth/login',
    register: 'auth/registrar',
  },
  materiais: 'materiais',
  grupos: 'grupos',
} as const;
