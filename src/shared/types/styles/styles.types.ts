export type VariantStyleAgregator<
  T extends string | number | symbol,
  S extends string | number | symbol,
> = {
  [k in T]: Partial<Record<S, string>>;
};
