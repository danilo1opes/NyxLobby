'use server';

import { STATS_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { StatsData, ActionResponse } from '@/types/actions';
import { cookies } from 'next/headers';

export default async function statsGet(): Promise<ActionResponse<StatsData>> {
  const token = (await cookies()).get('token')?.value;

  try {
    if (!token) throw new Error('Token inválido');

    const { url, options } = STATS_GET(token);
    const response = await fetch(url, {
      ...options,
      next: {
        revalidate: 300,
        tags: ['stats'],
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar estatísticas.');
    }

    const responseData = await response.json();

    const data: StatsData = {
      totalAccessos: responseData.totalAccessos || 0,
      fotosPostadas: responseData.fotosPostadas || 0,
      mediaAcessos: responseData.mediaAcessos || 0,
      fotoMaisAcessada: responseData.fotoMaisAcessada || {
        id: '',
        title: 'Nenhuma foto',
        acessos: 0,
        src: '',
        author: '',
      },
      rankingFotos: responseData.rankingFotos || [],
      tendenciaPerformance: responseData.tendenciaPerformance || [],
    };

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError<StatsData>(error);
  }
}
