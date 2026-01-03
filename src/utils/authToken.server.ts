import { config } from '@/config';
import { NextRequest } from 'next/server';

// Server-side functions (using next/headers)
export const getRefreshTokenServer = (req: NextRequest): string | undefined => {
  const token = req.cookies.get(config.token.refreshTokenName)?.value;
  if (!token) return undefined;
  return token;
};

export const hasAuthTokens = (req: NextRequest): boolean => {
    const refreshToken = getRefreshTokenServer(req);
    return !!refreshToken;
};
