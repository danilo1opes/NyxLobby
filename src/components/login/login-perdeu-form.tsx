'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import React, { useActionState } from 'react';
import Input from '@/components/forms/input';
import ErrorMessage from '@/components/helper/error-message';
import styles from '@/components/login/login-form.module.css';
import passwordLost from '@/actions/password-lost';

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Enviando...</Button>
      ) : (
        <Button>Enviar Email</Button>
      )}
    </>
  );
}

export default function LoginPerdeuForm() {
  const [state, action] = useActionState(passwordLost, {
    ok: false,
    error: '',
    data: null,
  });

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Email / Usúario" name="login" type="text" />
        <input
          type="hidden"
          name="url"
          value={`${window.location.protocol}//${window.location.host}`}
        />
        <ErrorMessage error={state.error} />
        {state.ok ? (
          <p style={{ color: '#4c1', marginTop: '1rem' }}>Email enviado.</p>
        ) : (
          <FormButton />
        )}
      </form>
    </>
  );
}
