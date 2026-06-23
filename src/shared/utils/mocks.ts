export function mockArray<T>(
  length: number = 30,
  mocks: T[],
): T[] {
  return Array.from(
    { length },
    (_, i) => mocks[i % mocks.length],
  );
}
