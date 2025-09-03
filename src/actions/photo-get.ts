'use server';

import { PHOTO_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { PhotoData, ActionResponse } from '@/types/actions';

export default async function photoGet(
  id: string,
): Promise<ActionResponse<PhotoData>> {
  try {
    const { url, options } = PHOTO_GET(id);
    const response = await fetch(url, {
      ...options,
      next: {
        revalidate: 60,
        tags: ['photos', 'comment'],
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao pegar a foto.');
    }

    const responseData = await response.json();

    const data: PhotoData = {
      photo: {
        id: responseData.photo.id,
        author: responseData.photo.author,
        title: responseData.photo.title,
        date: responseData.photo.date,
        src: responseData.photo.src,
        personagem: responseData.photo.personagem,
        epoca: responseData.photo.epoca,
        acessos: responseData.photo.acessos,
        total_comments: responseData.photo.total_comments,
      },
      comments: responseData.comments || [],
    };

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError<PhotoData>(error);
  }
}
