import { CreateUser, User } from '$database';

export interface UserService {
  /**
   * Saves a new {@link User} instance in the database. If the email or username
   * already exists in the db, a {@link HttpException} gets thrown.
   *
   * @param user  The user dto which should get persisted
   * @throws      {@link HttpException} if username or email already exists
   * @returns     The created database user
   */
  create: (payload: CreateUser) => Promise<User>;

  /**
   * Find an {@link User} by it's id. If no user with the provided
   * id was found, a {@link HttpException} gets thrown.
   *
   * @param id  The id of the searched user
   * @throws    {@link HttpException} if no user was found
   * @returns   The database user with the provided id
   */
  findById(id: string): Promise<User>;

  /**
   * Find an {@link User} by it's email or username. If no user with
   * the provided identifier was found, a {@link HttpException} gets thrown.
   *
   * @param identifier  The email or username of the searched user
   * @throws            {@link HttpException} if no user was found
   * @returns           The database user with the provided identifier
   */
  findByEmailOrUsername: (identifier: string) => Promise<User>;

  /**
   * Finds a {@link User} based on his refresh token list. If no
   * user was found, a {@link HttpException} gets thrown.
   *
   * @param refreshToken  The token to search for in the database
   * @throws              {@link HttpException} if no user contains the provided token
   * @returns             The user with the provided refresh token
   */
  findByToken: (refreshToken: string) => Promise<User>;

  /**
   * Override all active refresh tokens associated with a {@link User}.
   * This can be used to invalidate all token after token reuse
   * (clear all bsy saving []), or just adding a token. In order to optimize
   * database calls, this methods exists instead of single functions to
   * handle tokens. So in order to use this, first read the tokens,
   * manipulate and save them afterwards. If any of the tokens already
   * were assigned to another user, a {@link HttpException} gets thrown.
   *
   * @param id      The unique identifier of the user
   * @param tokens  The token list to associate to the user
   * @throws        {@link HttpException} if token was reused
   * @returns       The updated user instance
   */
  persistTokens: (id: string, tokens: string[]) => Promise<User>;
}
