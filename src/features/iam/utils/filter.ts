import type { Kanji } from "@features/kanji/types";
import { normalizeText } from "@shared/utils/string";

export type DiscoveredFilters = {
  search: string;
  sort: string;
};

export const discoveredFilter = (
  item: Kanji,
  filters: DiscoveredFilters,
) => {
  const search = normalizeText(filters.search.trim());

  const escaped = search.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const regex = new RegExp(`${escaped}`, "i");

  const searchable = [
    item.kanji,
    ...item.meanings,
    ...item.kunReadings,
    ...item.onReadings,
  ]
    .map(normalizeText)
    .filter(Boolean);

  const matchesSearch =
    !search ||
    searchable.some((value) => regex.test(value));

  const matchesSort =
    !filters.sort ||
    item.category === filters.sort ||
    item.status === filters.sort;

  return matchesSearch && matchesSort;
};
