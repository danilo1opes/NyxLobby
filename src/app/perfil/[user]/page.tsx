import LoginResetarForm from '@/components/login/login-resetar-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resetar a senha | Lobby',
  description: 'Resete sua senha e entre no Lobby',
};

interface ResetarSearchParams {
  searchParams: Promise<{ key: string; login: string }>;
}

export default async function ResetPage({ searchParams }: ResetarSearchParams) {
  const { key, login } = await searchParams;

  return (
    <div className="animeLeft">
      <h1 className="title">Resete a senha</h1>
      <LoginResetarForm keyToken={key} login={login} />
    </div>
  );
}
