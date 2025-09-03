'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import statsGet from '@/actions/stats-get';
import { StatsData } from '@/types/actions';
import styles from './conta-estatistica.module.css';

// loading
const LoadingSkeleton = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
    <p>Carregando estatísticas...</p>
  </div>
);

export default function ContaEstatistica() {
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await statsGet();

        if (result.ok && result.data) {
          setStatsData(result.data);
        } else {
          setError(result.error || 'Erro ao carregar estatísticas');
        }
      } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
        setError('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <div className={styles.errorIcon}>⚠️</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!statsData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Cards de Estatísticas */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.fadeIn}`}>
            <div className={styles.statIcon}>📈</div>
            <div className={styles.statNumber}>
              {(statsData.totalAccessos || 0).toLocaleString()}
            </div>
            <div className={styles.statLabel}>Total de Acessos</div>
          </div>

          <div
            className={`${styles.statCard} ${styles.fadeIn}`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className={styles.statIcon}>📷</div>
            <div className={styles.statNumber}>
              {statsData.fotosPostadas || 0}
            </div>
            <div className={styles.statLabel}>Fotos Postadas</div>
          </div>
        </div>

        {/* Foto Mais Acessada */}
        {statsData.fotoMaisAcessada && (
          <div
            className={`${styles.highlightCard} ${styles.fadeIn}`}
            style={{ animationDelay: '0.3s' }}
          >
            <h2 className={styles.highlightTitle}>🏆 Foto Mais Acessada</h2>
            <div className={styles.highlightContent}>
              {statsData.fotoMaisAcessada.src ? (
                <div className={styles.imageWrapper}>
                  {!imageLoaded && (
                    <div className={styles.imageSkeleton}>
                      <span>📷</span>
                    </div>
                  )}
                  <Image
                    src={statsData.fotoMaisAcessada.src}
                    alt={
                      statsData.fotoMaisAcessada.title || 'Foto mais acessada'
                    }
                    width={150}
                    height={150}
                    className={`${styles.highlightImage} ${
                      imageLoaded ? styles.imageVisible : ''
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                </div>
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>📷</span>
                </div>
              )}
              <div className={styles.highlightInfo}>
                <h3>{statsData.fotoMaisAcessada.title || 'Sem título'}</h3>
                <div className={styles.accessCount}>
                  <span className={styles.accessNumber}>
                    {statsData.fotoMaisAcessada.acessos || 0}
                  </span>
                  <span className={styles.accessLabel}>acessos</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem quando não há dados */}
        {!statsData.fotoMaisAcessada && (
          <div className={styles.noDataMessage}>
            <div className={styles.noDataIcon}>📊</div>
            <p>Não há dados de fotos disponíveis no momento</p>
          </div>
        )}
      </div>
    </div>
  );
}
