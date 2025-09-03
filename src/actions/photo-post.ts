'use server';

import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { ActionResponse } from '@/types/actions';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function photoPost(
  state: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const nome = formData.get('nome') as string | null;
  const personagem = formData.get('personagem') as string | null;
  const epoca = formData.get('epoca') as string | null;
  const img = formData.get('img') as File | null;

  try {
    if (!nome || !personagem || !epoca) {
      throw new Error('Preencha todos os campos obrigatórios');
    }

    if (!img || img.size === 0) {
      throw new Error('Selecione uma imagem');
    }

    if (!img.type.startsWith('image/')) {
      throw new Error('Arquivo deve ser uma imagem');
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (img.size > maxSize) {
      throw new Error('Imagem deve ter no máximo 5MB');
    }

    const token = (await cookies()).get('token')?.value;
    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.');
    }

    const photoFormData = new FormData();
    photoFormData.append('img', img);
    photoFormData.append('nome', nome);
    photoFormData.append('personagem', personagem);
    photoFormData.append('epoca', epoca);

    const { url, options } = PHOTO_POST(photoFormData, token);
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Erro ao enviar foto');
    }
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag('photos');
  redirect('/');
}
