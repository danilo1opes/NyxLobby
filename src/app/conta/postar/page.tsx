import ContaPhotoPost from '@/components/conta/conta-photo-post';
import { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Postar | Minha Conta',
  description: 'Compartilhe suas melhores paisagens e capturas de tela.',
};

export default async function PostarPage() {
  return <ContaPhotoPost />;
}
