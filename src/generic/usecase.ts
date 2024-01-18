export interface UseCase<R, T> {
  execute(data: R): Promise<T>;
}
