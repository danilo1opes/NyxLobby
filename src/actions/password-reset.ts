import { PASSWORD_RESET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { ActionResponse } from '@/types/actions';

interface PasswordResetData {
  success: boolean;
}

export default async function passwordReset(
  state: ActionResponse<PasswordResetData>,
  formData: FormData,
): Promise<ActionResponse<PasswordResetData>> {
  const password = formData.get('password') as string | null;
  const login = formData.get('login') as string | null;
  const key = formData.get('key') as string | null;

  try {
    if (!password || !login || !key) {
      throw new Error('Preencha todos os dados');
    }

    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    const { url, options } = PASSWORD_RESET({
      login,
      password,
      key,
    });

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Token inválido ou expirado');
    }

    return {
      data: { success: true },
      ok: true,
      error: '',
    };
  } catch (error: unknown) {
    return apiError(error) as ActionResponse<PasswordResetData>;
  }
}
