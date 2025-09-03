'use server';

import { USER_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { ActionResponse, User } from '@/types/actions';
import { cookies } from 'next/headers';

export default async function userGet(): Promise<ActionResponse<User>> {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new Error('Token não encontrado.');

    const { url, options } = USER_GET(token);
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Usuário não autorizado. Faça login novamente.');
      }
      throw new Error('Erro ao buscar dados do usuário.');
    }

    const userData: User = await response.json();

    return {
      data: userData,
      ok: true,
      error: '',
    };
  } catch (error: unknown) {
    return apiError<User>(error);
  }
}
