export const API_URL = 'https://lobby-backend-7r4k.onrender.com/json/';

export function TOKEN_POST(body: { username: string; password: string }) {
  return {
    url: API_URL + 'login',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token: string) {
  return {
    url: API_URL + 'user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_GET(token: string) {
  return {
    url: API_URL + 'user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body: {
  email: string;
  username: string;
  password: string;
}) {
  return {
    url: API_URL + 'user',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_LOST(body: { login: string; url?: string }) {
  return {
    url: API_URL + 'password/lost',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body: {
  login: string;
  password: string;
  key: string;
}) {
  return {
    url: API_URL + 'password/reset',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

export function PHOTO_POST(formData: FormData, token: string) {
  return {
    url: API_URL + 'photo',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}

export function PHOTOS_GET({
  page,
  total,
  user,
}: {
  page: number;
  total: number;
  user?: string;
}) {
  return {
    url: `${API_URL}photo?_page=${page}&_total=${total}&_user=${user || ''}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function PHOTO_GET(id: string) {
  return {
    url: `${API_URL}photo/${id}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function COMMENT_POST(
  id: string,
  body: { comment: string },
  token: string,
) {
  return {
    url: `${API_URL}comment/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function COMMENT_GET(id: string) {
  return {
    url: `${API_URL}comment/${id}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function PHOTO_DELETE(id: string, token: string) {
  return {
    url: `${API_URL}photo/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function STATS_GET(token: string) {
  return {
    url: API_URL + 'stats',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
