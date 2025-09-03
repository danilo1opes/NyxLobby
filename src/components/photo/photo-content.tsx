'use client';

import React from 'react';
import styles from './photo-content.module.css';
import PhotoComments from './photo-comments';
import PhotoDelete from './photo-delete';
import Link from 'next/link';
import { useUser } from '@/context/user-context';
import Image from 'next/image';
import { PhotoData } from '@/types/actions';

const PhotoContent = ({
  data,
  single,
}: {
  data: PhotoData;
  single: boolean;
}) => {
  const { user } = useUser();
  const { photo, comments } = data;

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('PhotoContent - Dados recebidos:', data);
      console.log('PhotoContent - Photo:', photo);
      console.log('PhotoContent - Comments:', comments);
    }
  }, [data, photo, comments]);

  if (!photo) {
    console.error('PhotoContent - Dados da foto ausentes');
    return (
      <div className={styles.photoError}>
        <p>Erro ao carregar os dados da foto</p>
      </div>
    );
  }

  const imageSrc = photo.src || '';
  if (!imageSrc) {
    console.warn('PhotoContent - URL da imagem ausente:', photo);
    return (
      <div className={styles.photoError}>
        <p>URL da imagem não encontrada</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image
          src={imageSrc}
          alt={photo.title || 'Foto'}
          width={1000}
          height={1000}
          priority={single}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            console.error('Erro ao carregar imagem:', imageSrc);
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML =
                '<div class="' +
                styles.imageError +
                '">Erro ao carregar imagem</div>';
            }
          }}
        />
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === photo.author ? (
              <PhotoDelete id={String(photo.id)} />
            ) : (
              <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>
              {formatViews(photo.acessos)} visualizações
            </span>
          </p>

          <h1 className={styles.title}>
            <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>

          <ul className={styles.attributes}>
            {photo.personagem && (
              <li>
                <strong>Personagem:</strong> {photo.personagem}
              </li>
            )}
            {photo.epoca && (
              <li>
                <strong>Época:</strong> {photo.epoca}
              </li>
            )}
            {photo.date && (
              <li>
                <strong>Publicado:</strong> {formatDate(photo.date)}
              </li>
            )}
          </ul>
        </div>
      </div>

      {single && (
        <PhotoComments
          single={single}
          id={String(photo.id)}
          comments={comments || []}
        />
      )}
    </div>
  );
};

export default PhotoContent;
