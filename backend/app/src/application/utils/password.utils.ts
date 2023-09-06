export const PasswordHash = {
  hash: async (password: string): Promise<string> => {
    return Bun.password.hash(password, { algorithm: 'bcrypt', cost: 10 });
  },

  compare: async (password: string, hash: string): Promise<boolean> => {
    return Bun.password.verify(password, hash);
  },
};
