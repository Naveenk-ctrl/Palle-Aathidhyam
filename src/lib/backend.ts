export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export function backendUrl(path: string) {
  return `${BACKEND_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
