import LinkButton from '@/components/link/link';

export default function NotFound() {
  return (
    <section className="container">
      <h1 className="title">Página não encontrada</h1>
      <LinkButton className="button" href={'/'}>
        Volte para a Home.
      </LinkButton>
    </section>
  );
}
