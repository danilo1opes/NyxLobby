import { Photo } from '@/types/actions';
import Image from 'next/image';
import Link from 'next/link';
import styles from './feed.module.css';

export default function FeedPhotos({ photos }: { photos: Photo[] }) {
  if (!Array.isArray(photos)) {
    return <p>Nenhuma foto encontrada.</p>;
  }

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {photos.map((photo, i) => (
        <li className={styles.photo} key={photo.id + i}>
          <Link href={`/foto/${photo.id}`} scroll={false}>
            {photo.src ? (
              <Image
                src={photo.src}
                width={1500}
                height={1500}
                alt={photo.title}
                sizes="80vw"
              />
            ) : null}
            <span className={styles.visualizacao}>{photo.acessos}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
