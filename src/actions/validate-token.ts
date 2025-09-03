'use server';

import { TOKEN_VALIDATE_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { cookies } from 'next/headers';

export default async function validateToken() {
  const token = (await cookies()).get('token')?.value;

  try {
    if (!token) throw new Error('Token inválido');

    const { url, options } = TOKEN_VALIDATE_POST(token);
    const response = await fetch(url, {
      ...options,
    });

    if (!response.ok) {
      throw new Error('Erro ao validar token');
    }

    const data = await response.json();
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
