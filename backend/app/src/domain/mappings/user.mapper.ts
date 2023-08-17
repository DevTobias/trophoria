import { PublicUser, User } from '$database';

export const mapUser = (user: User): PublicUser => ({
  id: user.id,
  email: user.email,
  username: user.username,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
