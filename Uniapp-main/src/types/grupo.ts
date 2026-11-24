export interface GrupoEstudo {
  id: number;
  nome: string;
  disciplina: string;
  curso: string;
  horario: string;
  formato: string;
  vagasDisponiveis: number;
  recomendado: boolean;
}

export type CreateGrupoEstudoRequest = Omit<GrupoEstudo, 'id'>;

export interface GrupoEstudoFilters {
  formato?: string;
  busca?: string;
}
