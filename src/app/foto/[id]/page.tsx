import photoGet from '@/actions/photo-get';
import PhotoContent from '@/components/photo/photo-content';
import { notFound } from 'next/navigation';

interface PhotoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PhotoPageProps) {
  const { id } = await params;
  const { data } = await photoGet(id);

  if (!data) {
    return {
      title: 'Foto não encontrada',
    };
  }

  return {
    title: `${data.photo.title} | NyxLobby`,
    description: `Foto de ${data.photo.personagem} da época ${data.photo.epoca}, por @${data.photo.author}`,
  };
}

export default async function PhotoIdPage({ params }: PhotoPageProps) {
  const { id } = await params;
  const response = await photoGet(id);

  if (!response.ok || !response.data) {
    console.error('PhotoIdPage - Erro:', response.error);
    notFound();
  }

  const { data } = response;

  return (
    <section className="mainContainer container">
      <PhotoContent data={data} single={true} />
    </section>
  );
}
