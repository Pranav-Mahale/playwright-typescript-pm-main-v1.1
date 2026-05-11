import type { LoginUser } from '@domains/login-domain';

export function makeUniqueUser(prefix = 'qa-user'): LoginUser {
  return {
    username: `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    password: 'Password123!'
  };
}
