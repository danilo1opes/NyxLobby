'use server';

import { USER_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import login from '@/actions/login';
import { ActionResponse } from '@/types/actions';

export default async function userPost(
  state: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;
  const email = formData.get('email') as string | null;

  try {
    if (!email || !username || !password) throw new Error('Preencha os dados');
    if (password.length < 6)
      throw new Error('A senha deve ter mais de 6 dígitos');

    const { url, options } = USER_POST({ email, username, password });
    const response = await fetch(url, options);

    if (!response.ok) throw new Error('Email ou usuário já cadastrado.');

    const { ok } = await login({ ok: true, error: '', data: null }, formData);
    if (!ok) throw new Error('Erro ao logar.');

    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
