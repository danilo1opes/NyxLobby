'use server';

import { PHOTOS_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { ActionResponse, PhotosGetParams, Photo } from '@/types/actions';
import { cookies } from 'next/headers';

export default async function photosGet({
  page = 1,
  total = 6,
  user = '',
}: PhotosGetParams = {}): Promise<ActionResponse<Photo[]>> {
  try {
    const token = (await cookies()).get('token')?.value;

    const { url, options } = PHOTOS_GET({ page, total, user });

    const requestOptions = token
      ? {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
          next: { revalidate: 10, tags: ['photos'] },
        }
      : {
          ...options,
          next: { revalidate: 10, tags: ['photos'] },
        };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Erro ao buscar as fotos.');
    }

    const data: Photo[] = await response.json();

    return {
      data,
      ok: true,
      error: '',
    };
  } catch (error: unknown) {
    return apiError<Photo[]>(error);
  }
}
