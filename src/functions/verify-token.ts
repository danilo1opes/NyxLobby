import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET as string;

export default async function verfiyToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET_KEY), {
      algorithms: ['HS256'],
    });
    return true;
  } catch {
    return false;
  }
}
