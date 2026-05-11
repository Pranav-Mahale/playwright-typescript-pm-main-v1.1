export interface LoginUser {
  username: string;
  password: string;
}

export function standardUser(): LoginUser {
  return {
    username: 'standard_user',
    password: 'secret_sauce'
  };
}

export function lockedOutUser(): LoginUser {
  return {
    username: 'locked_out_user',
    password: 'secret_sauce'
  };
}
