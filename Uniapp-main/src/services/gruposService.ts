import { API_ROUTES } from '../config/api.back.config';
import type {
  CreateGrupoEstudoRequest,
  GrupoEstudo,
  GrupoEstudoFilters,
} from '../types/grupo';
import { buildQueryString, requestJson } from './apiClient';

export function getGrupos(filters: GrupoEstudoFilters = {}): Promise<GrupoEstudo[]> {
  const query = buildQueryString({
    formato: filters.formato,
    busca: filters.busca,
  });

  return requestJson<GrupoEstudo[]>(`${API_ROUTES.grupos}${query}`);
}

export function criarGrupo(
  data: CreateGrupoEstudoRequest,
): Promise<GrupoEstudo> {
  return requestJson<GrupoEstudo>(API_ROUTES.grupos, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function participarDoGrupo(id: number): Promise<GrupoEstudo> {
  return requestJson<GrupoEstudo>(
    `${API_ROUTES.grupos}/${id}/participar`,
    { method: 'POST' },
  );
}
