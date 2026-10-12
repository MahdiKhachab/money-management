import { decodeToken } from './session';
import { makeToken } from '../test/utils';

describe('decodeToken', () => {
  it('returns the user for a valid token', () => {
    const user = decodeToken(makeToken({ sub: 'ali', role: 'USER' }));
    expect(user).toMatchObject({ username: 'ali', role: 'USER' });
    expect(user.expiresAt).toBeGreaterThan(Date.now());
  });

  it('rejects an expired token', () => {
    expect(decodeToken(makeToken({ expiresInSec: -10 }))).toBeNull();
  });

  it('rejects missing or malformed tokens', () => {
    expect(decodeToken(null)).toBeNull();
    expect(decodeToken('not-a-jwt')).toBeNull();
  });
});
