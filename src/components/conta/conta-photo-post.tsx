'use client';

import { useFormStatus } from 'react-dom';
import React, { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';
import ErrorMessage from '@/components/helper/error-message';
import styles from '@/components/conta/conta-photo-post.module.css';
import photoPost from '@/actions/photo-post';

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Enviando...</Button>
      ) : (
        <Button>Enviar</Button>
      )}
    </>
  );
}

export default function ContaPhotoPost() {
  const [state, action] = useActionState(photoPost, {
    ok: false,
    error: '',
    data: null,
  });

  const [img, setImg] = useState<{
    preview: string | null;
    raw: File | null;
  }>({ preview: null, raw: null });

  const router = useRouter();

  useEffect(() => {
    if (state.ok && state.data) {
      console.log('Resposta completa do servidor:', state.data);
      setTimeout(() => {
        router.push('/conta');
      }, 1000);
    }
  }, [state.ok, state.data, router]);

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    if (target.files && target.files[0]) {
      setImg({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      });
    }
  }

  if (state.ok && state.data) {
    return (
      <section className={`${styles.photoPost} animeLeft`}>
        <h1>Foto enviada com sucesso!</h1>
        <p>Redirecionando para sua conta...</p>
      </section>
    );
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Nome do Jogo" name="nome" type="text" />
        <Input label="Nome do Personagem" name="personagem" type="text" />
        <Input label="Época do Jogo" name="epoca" type="text" />

        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          accept="image/*"
          onChange={handleImgChange}
          required
        />

        <ErrorMessage error={state.error} />
        <FormButton />
      </form>

      <div>
        {img.preview ? (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        ) : (
          <p>Selecione uma imagem para pré-visualizar</p>
        )}
      </div>
    </section>
  );
}
