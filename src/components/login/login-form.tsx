'use client';

import login from '@/actions/login';
import { useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import React, { useActionState } from 'react';
import Input from '@/components/forms/input';
import ErrorMessage from '@/components/helper/error-message';
import Link from 'next/link';
import styles from '@/components/login/login-form.module.css';
import LinkButton from '@/components/link/link';

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Carregando...</Button>
      ) : (
        <Button>Entrar</Button>
      )}
    </>
  );
}

export default function LoginForm() {
  const [state, action] = useActionState(login, {
    ok: false,
    error: '',
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) window.location.href = '/conta';
  }, [state.ok]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usúario" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <Link className={styles.perdeu} href="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no lobby</p>
        <LinkButton href="/login/criar">Cadastro</LinkButton>
      </div>
    </>
  );
}
