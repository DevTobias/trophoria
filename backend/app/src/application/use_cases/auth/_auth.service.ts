import { User } from '$database';
import { SignUpInterface } from '$domain/auth.interface';

export interface AuthService {
  /**
   * Registers a new {@link User} in the system. If the email or
   * username already exists, a {@link HttpException} gets thrown.
   *
   * @param user  The user dto which should get persisted
   * @throws      {@link HttpException} if username or email already exists
   * @returns     The freshly created user
   */
  signUp: (payload: SignUpInterface) => Promise<User>;
}
