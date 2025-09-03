import LoginCriarForm from '@/components/login/login-criar-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crie sua conta',
  description: 'Cadastre-se e Entre no seu seu próprio Lobby',
};

export default async function CriarPage() {
  return (
    <main className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <LoginCriarForm />
    </main>
  );
}
