import { ActionResponse } from '@/types/actions';

export default function apiError<T = unknown>(
  error: unknown,
): ActionResponse<T> {
  return {
    data: null as unknown as T,
    ok: false,
    error: error instanceof Error ? error.message : 'Erro desconhecido',
  };
}
