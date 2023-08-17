export const first = async <T>(
  val: Promise<T[]>,
  onError: (e?: Error) => never = () => {
    throw new Error('array is empty');
  }
): Promise<T> => {
  const awaitedVal = await val.catch((e) => onError(e));
  return awaitedVal.length === 0 ? onError() : awaitedVal[0];
};

export const onUndefined = async <T>(
  val: Promise<T | undefined>,
  onError: () => never = () => {
    throw new Error('array is empty');
  }
): Promise<T> => {
  return (await val) === undefined ? onError() : (val as Promise<T>);
};
