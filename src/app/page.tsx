import photosGet from '@/actions/photos-get';
import Feed from '@/components/feed/feed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed | Lobby',
  description:
    'Explore as fotos, paisagens e capturas de tela compartilhadas pela comunidade.',
};

export default async function HomePage() {
  const { data } = await photosGet();

  return (
    <section className="container mainContainer">
      {data && <Feed photos={data} />}
    </section>
  );
}
