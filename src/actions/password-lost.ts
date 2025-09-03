'use server';

import { PASSWORD_LOST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { ActionResponse } from '@/types/actions';

export default async function passwordLost(
  state: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const loginField = formData.get('login') as string | null;
  const urlPerdeu = formData.get('url') as string | null;

  try {
    if (!loginField) throw new Error('Preencha os dados');

    const { url, options } = PASSWORD_LOST({
      login: loginField,
      url: urlPerdeu || '',
    });

    const response = await fetch(url, options);

    if (!response.ok) throw new Error('Email ou usuário não cadastrado.');

    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
