import { API_ROUTES } from '../config/api.back.config';
import type {
  CreateMaterialRequest,
  Material,
  MaterialFilters,
} from '../types/material';
import { buildQueryString, requestJson } from './apiClient';

export function getMateriais(filters: MaterialFilters = {}): Promise<Material[]> {
  const query = buildQueryString({
    categoria: filters.categoria,
    busca: filters.busca,
  });

  return requestJson<Material[]>(`${API_ROUTES.materiais}${query}`);
}

export function criarMaterial(data: CreateMaterialRequest): Promise<Material> {
  return requestJson<Material>(API_ROUTES.materiais, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
