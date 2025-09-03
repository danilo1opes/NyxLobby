'use server';

import { COMMENT_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { ActionResult, CommentResponse } from '@/types/actions';

export default async function commentPost(
  photoId: string,
  comment: string,
): Promise<ActionResult<CommentResponse>> {
  const token = (await cookies()).get('token')?.value;

  try {
    if (!token) throw new Error('Token inválido');

    if (!comment.trim()) throw new Error('Comentário não pode estar vazio');

    const { url, options } = COMMENT_POST(
      photoId,
      { comment: comment.trim() },
      token,
    );

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Erro ao enviar comentário');
    }

    const result = await response.json();

    revalidateTag('photo');
    revalidateTag('photos');
    revalidateTag(`comments-${photoId}`);

    return { success: true, data: result };
  } catch (error: unknown) {
    const errorResult = apiError(error);
    return {
      success: false,
      error: errorResult.error || 'Erro ao enviar comentário',
    };
  }
}
