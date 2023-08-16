import { User } from '$database';
import { CreateUserInterface } from '$domain/interface/user.interface';

export interface UserService {
  /**
   * Saves a new {@link User} instance in the database. If the email or username
   * already exists in the db, a {@link HttpException} gets thrown.
   *
   * @param user  The user dto which should get persisted
   * @throws      {@link HttpException} if username or email already exists
   * @returns     The created database user
   */
  create: (payload: CreateUserInterface) => Promise<User>;
}
