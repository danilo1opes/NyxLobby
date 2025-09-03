'use server';

import { PHOTO_DELETE } from '@/functions/api';
import apiError from '@/functions/api-error';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function photoDelete(id: string) {
  const token = (await cookies()).get('token')?.value;

  try {
    if (!token) throw new Error('Token inválido');

    const { url, options } = PHOTO_DELETE(id, token);

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Erro ao deletar a foto.');
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      await response.json();
    }
  } catch (error: unknown) {
    return apiError(error);
  }

  revalidateTag('photos');
  redirect('/conta');
}
