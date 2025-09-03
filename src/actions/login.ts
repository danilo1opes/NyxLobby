'use server';

import { TOKEN_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { ActionResponse } from '@/types/actions';
import { cookies } from 'next/headers';

export default async function login(
  state: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;

  try {
    if (!username || !password) throw new Error('Preencha os dados');

    const { url, options } = TOKEN_POST({ username, password });
    const response = await fetch(url, options);

    if (!response.ok) throw new Error('Senha ou usuário inválidos');

    const data = await response.json();

    (await cookies()).set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5, // 5 dias
    });

    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
