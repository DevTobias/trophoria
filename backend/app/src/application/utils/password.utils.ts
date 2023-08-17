import { genSalt, hash as secureHash, compare as compareHash } from 'bcryptjs';

export const PasswordHash = {
  hash: async (password: string): Promise<string> => {
    return secureHash(password, await genSalt(10));
  },

  compare: async (password: string, hash: string): Promise<boolean> => {
    return compareHash(password, hash);
  },
};
