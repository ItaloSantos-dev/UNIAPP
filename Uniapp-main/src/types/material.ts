export interface MaterialUser {
  id: number;
  nome: string;
  emailInstitucional: string;
  curso: string;
  reputacao: number;
}

export interface Material {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  cursoRelacionado: string;
  estadoConservacao: string;
  modalidade: string;
  preco: number;
  imagemUrl: string;
  contatoWhatsApp: string;
  dataCriacao: string;
  usuarioId: number;
  usuario?: MaterialUser | null;
}

export interface CreateMaterialRequest {
  titulo: string;
  descricao?: string;
  categoria: string;
  cursoRelacionado: string;
  estadoConservacao: string;
  modalidade: string;
  preco: number;
  imagemUrl?: string;
  contatoWhatsApp?: string;
  usuarioId: number;
}

export interface MaterialFilters {
  categoria?: string;
  busca?: string;
}
