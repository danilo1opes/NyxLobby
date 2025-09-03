import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const LoadingEstatisticas = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Carregando estatísticas...</p>

    <style
      dangerouslySetInnerHTML={{
        __html: `
        .loading-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          font-family: Inter, system-ui, sans-serif;
        }
        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .loading-container p {
          color: #6b7280;
          font-size: 1.25rem;
          font-weight: 500;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `,
      }}
    />
  </div>
);

// lazy loading
const ContaEstatistica = dynamic(
  () => import('@/components/conta/conta-estatistica'),
  {
    loading: () => <LoadingEstatisticas />,
  },
);

export const metadata: Metadata = {
  title: 'Estatísticas | Minha Conta',
  description: 'Visualize suas estatísticas de fotos e acessos',
  keywords: ['estatísticas', 'fotos', 'acessos', 'dashboard'],
};

export default function EstatisticasPage() {
  return <ContaEstatistica />;
}
