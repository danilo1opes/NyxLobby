'use client';

import { Photo } from '@/types/actions';
import FeedPhotos from './feed-photos';
import React from 'react';
import photosGet from '@/actions/photos-get';
import Loading from '@/components/helper/loading';
import styles from './feed.module.css';

export default function Feed({
  photos,
  user,
}: {
  photos: Photo[];
  user?: string;
}) {
  const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [infinite, setInfinite] = React.useState(
    photos.length < 6 ? false : true,
  );

  const fetching = React.useRef(false);

  function infiniteScroll() {
    if (fetching.current) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      fetching.current = true;
      setLoading(true);
      setPage((currentPage) => currentPage + 1);
    }
  }

  React.useEffect(() => {
    if (page === 1) return;

    async function getPagePhotos(page: number) {
      try {
        const actionData = await photosGet({
          page,
          total: 6,
          user: user || '',
        });

        if (actionData && actionData.ok && actionData.data) {
          const { data } = actionData;
          const photos = Array.isArray(data) ? (data as Photo[]) : [];
          setPhotosFeed((currentPhotos) => [...currentPhotos, ...photos]);

          if (photos.length < 6) {
            setInfinite(false);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar fotos:', error);
      } finally {
        fetching.current = false;
        setLoading(false);
      }
    }

    getPagePhotos(page);
  }, [page, user]);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    function throttledInfiniteScroll() {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        infiniteScroll();
        timeoutId = null;
      }, 200);
    }

    if (infinite) {
      window.addEventListener('scroll', throttledInfiniteScroll);
    }

    return () => {
      window.removeEventListener('scroll', throttledInfiniteScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {infinite ? (
          loading && <Loading />
        ) : (
          <p>Todas as fotos foram carregadas</p>
        )}
      </div>
    </div>
  );
}
