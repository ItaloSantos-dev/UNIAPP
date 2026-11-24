import { API_BASE_URL } from '../config/api.back.config';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getErrorMessage(payload: unknown): string | undefined {
  if (typeof payload !== 'object' || payload === null || !('mensagem' in payload)) {
    return undefined;
  }

  const message = payload.mensagem;
  return typeof message === 'string' ? message : undefined;
}

export async function requestJson<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(
    `${API_BASE_URL}/${path.replace(/^\/+/, '')}`,
    { ...options, headers },
  );
  const responseText = await response.text();
  let payload: unknown;

  if (responseText) {
    try {
      payload = JSON.parse(responseText) as unknown;
    } catch (error) {
      if (error instanceof SyntaxError) {
        if (response.ok) {
          throw new ApiError('A API retornou uma resposta JSON inválida.', response.status);
        }
      } else {
        throw error;
      }
    }
  }

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(payload) ?? `A requisição falhou (${response.status}).`,
      response.status,
      payload,
    );
  }

  if (payload === undefined) {
    throw new ApiError('A API retornou uma resposta vazia.', response.status);
  }

  return payload as T;
}

export function buildQueryString(
  filters: Record<string, string | undefined>,
): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      query.set(key, value);
    }
  }

  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}
