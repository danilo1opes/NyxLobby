'use client';
import { useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import React, { useActionState, useEffect } from 'react';
import Input from '@/components/forms/input';
import ErrorMessage from '@/components/helper/error-message';
import styles from '@/components/login/login-form.module.css';
import passwordReset from '@/actions/password-reset';
import { useRouter } from 'next/navigation';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Resetando...</Button>
      ) : (
        <Button>Resetar Senha</Button>
      )}
    </>
  );
}

export default function LoginResetarForm({
  keyToken,
  login,
}: {
  login: string;
  keyToken: string;
}) {
  const [state, action] = useActionState(passwordReset, {
    ok: false,
    error: '',
    data: { success: false }, // Changed from null to { success: false }
  });

  const router = useRouter();

  useEffect(() => {
    if (state.ok && state.data?.success) {
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
  }, [state.ok, state.data, router]);

  if (state.ok && state.data?.success) {
    return (
      <div className="animeLeft">
        <h1 className="title-success">✅ Senha resetada com sucesso!</h1>
        <p>Redirecionando para o login...</p>
      </div>
    );
  }

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Nova Senha" name="password" type="password" />
        <input type="hidden" name="login" value={login} />
        <input type="hidden" name="key" value={keyToken} />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  );
}
